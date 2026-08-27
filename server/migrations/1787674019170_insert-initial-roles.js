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
    pgm.sql(`
    INSERT INTO roles (name, description)
    VALUES
      ('admin', 'System administrator'),
      ('bank_manager', 'Bank manager'),
      ('bank_staff', 'Bank staff'),
      ('customer', 'Banking customer');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        delete from roles
        where name in ('admin','bank_manager','bank_staff','customer');`
    );
};
