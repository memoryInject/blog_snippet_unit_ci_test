const pg = require('pg');

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this.check();
  }

  close() {
    this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }

  check() {
    return this._pool.query(
      `SELECT boot_val,reset_val, current_database(), NOW() FROM pg_settings WHERE name='listen_addresses';`
    );
  }
}

module.exports = new Pool();
