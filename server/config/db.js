const pool = require('./pool');
const colors = require('colors');

const connectDB = async (config) => {
  try {
    const {
      rows: [conn],
    } = await pool.connect(config);

    console.log(
      `Postgres Connected: ${conn.boot_val}:${conn.current_database} on ${conn.now}`
        .cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
