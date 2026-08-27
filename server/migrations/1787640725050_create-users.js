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
    pgm.createTable('users',{
       id:{
        type:'bigserial',
        primaryKey:true,
       },
       email:{
        type: 'varchar(255)',
        notNull: true,
        unique: true,
       },
       password_hash:{
        type: 'text',
        notNull: true,
       },
       created_at:{
        type: 'timestamptz',
        notNull: true,
        default: pgm.func('current_timestamp'),
       },
       updated_at:{
        type: 'timestamptz',
        notNull: true,
        default: pgm.func('current_timestamp'),
       },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users');
};
