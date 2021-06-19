const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.resolve(__dirname, '../.env.test'),
  });
} else {
  dotenv.config();
}

console.log('DATABASE_NAME: ', process.env.DATABASE_NAME);

module.exports = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.POSTGRES_USER,
};
