/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      username VARCHAR(240) NOT NULL,
      email VARCHAR(240) NOT NULL UNIQUE,
      password VARCHAR(240) NOT NULL
    );
`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
