const path = require('path');
const dotenv = require('dotenv');

const app = require('./app');
const connectDB = require('./config/db');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.resolve(__dirname, '../.env.test'),
  });
} else {
  dotenv.config();
}

const config = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

connectDB(config);

const PORT = process.env.PORT || 5000;

app().listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightYellow.bold
  )
);
