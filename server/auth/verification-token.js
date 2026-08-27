import crypto from 'node:crypto';
import {pool} from '../db.js';

 
export function generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
}
export function hashVerificationToken(token){
    return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createVerificationToken(userId,client = pool) {
    const token = generateVerificationToken();
    const tokenHash = hashVerificationToken(token);
    // const client = await pool.connect();
    await client.query(
        `
        insert into email_verification_tokens(user_id,token_hash,expires_at)
        values($1,$2,now()+interval '20 minutes')`,
        [userId,tokenHash]
    );
    return token;  
}
export async function verifyEmailToken(token) {
    const tokenHash = hashVerificationToken(token);
    const client = await pool.connect();

    try{
        await client.query('BEGIN');
        const result = await client.query(
        `
        SELECT user_id
        FROM email_verification_tokens
        WHERE token_hash = $1
          AND used_at IS NULL
          AND expires_at > NOW()
        FOR UPDATE
        `,
        [tokenHash]
        );

        if (result.rows.length === 0) {
            throw new Error('Invalid or expired verification token');
        }

        const userId = result.rows[0].user_id;

        await client.query(
            `
            UPDATE users
            SET email_verified_at = NOW()
            WHERE id = $1
            `,
            [userId]
        );

        await client.query(
            `
            UPDATE email_verification_tokens
            SET used_at = NOW()
            WHERE token_hash = $1
            `,
            [tokenHash]
        );
        await client.query('COMMIT');
        return userId;
    }catch(error){
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
    
} 