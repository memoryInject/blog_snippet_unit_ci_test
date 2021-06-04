const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  host: 'localhost',
  port: 5432,
  database: 'blogs_dev',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
