const pg = require('pg');
const colors = require('colors');

const config = require('./config');

const table = 'blogs';
const data = require(`./${table}`);

const pool = new pg.Pool(config);

if (process.argv[2] === '-d') {
  pool
    .query(`DELETE FROM ${table}`)
    .then(() => {
      console.log(`Data destroyed: ${table}`.red.inverse);
      pool.end();
    })
    .catch((err) => console.log(`${err.message}`.red.inverse));
} else {
  pool
    .query(data)
    .then(() => {
      console.log(`Import data: ${table}`.green.inverse);
      pool.end();
    })
    .catch((err) => console.log(`${err.message}`.red.inverse));
}
