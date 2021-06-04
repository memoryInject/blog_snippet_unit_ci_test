const pool = require('./pool');
const colors = require('colors');

const connectDB = async () => {
  try {
    const {
      rows: [conn],
    } = await pool.connect({
      host: 'localhost',
      port: 5432,
      database: 'blogs_dev',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    });

    console.log(
      `Postgres Connected: ${conn.boot_val}:${conn.current_database} on ${conn.now}`
        .cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
