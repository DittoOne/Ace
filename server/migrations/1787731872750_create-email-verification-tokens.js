/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('email_verification_tokens', {
        id: {
            type: 'bigserial',
            primaryKey: true,
        },

        user_id: {
            type: 'bigint',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE',
        },

        token_hash: {
            type: 'text',
            notNull: true,
            unique: true,
        },

        expires_at: {
            type: 'timestamptz',
            notNull: true,
        },

        used_at: {
            type: 'timestamptz',
            default: null,
        },

        created_at: {
            type: 'timestamptz',
            default: pgm.func('current_timestamp'),
            notNull: true,
        },
    });

    pgm.createIndex('email_verification_tokens', 'user_id');
};


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('email_verification_tokens');
};
