import {pool} from '../db.js';
import {hashPassword} from './password.js';
import { sendVerificationEmail } from '../email.js';
import { createVerificationToken } from './verification-token.js';

export async function registerUser(email, password) {
    const hashedPassword = await hashPassword(password);

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const result = await client.query(
            `
            INSERT INTO users (email, password_hash, role_id)
            SELECT $1, $2, id
            FROM roles
            WHERE name = 'customer'
            RETURNING id, email, role_id, created_at
            `,
            [email, hashedPassword]
        );

        if (result.rows.length === 0) {
            throw new Error('Customer role does not exist');
        }

        const user = result.rows[0];

        const token = await createVerificationToken(user.id, client);

        await client.query('COMMIT');

        await sendVerificationEmail(user.email, token);

        return user;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}