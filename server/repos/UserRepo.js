const Repo = require('./Repo');
const bcrypt = require('bcryptjs');

class UserRepo extends Repo {
  async getAllUsers() {
    return await this.find({ columns: ['password'], type: 'invert' });
  }

  async getUserById(id, filter = { columns: [], type: 'normal' }) {
    return await this.findById(id, filter);
  }

  async createUser(data) {
    data.password = bcrypt.hashSync(data.password, 10);
    const row = await this.insert(data);
    if (row.password) {
      delete row.password;
    }

    return row;
  }

  async updateUser(id, data) {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    const row = await this.update(id, data);
    if (row.password) {
      delete row.password;
    }

    return row;
  }

  async deleteUser(id) {
    const row = await this.delete(id);
    if (row.password) {
      delete row.password;
    }

    return row;
  }

  async userCount() {
    const rows = await this.countRows();
    return parseInt(rows.count);
  }
}

const config = {
  table: 'users',
  columns: ['id', 'username', 'email', 'password', 'created_at', 'updated_at'],
};

module.exports = new UserRepo(config);
