const Repo = require('./Repo');

class UserRepo extends Repo {
  async getAllUsers() {
    return this.find({ columns: ['password'], type: 'invert' });
  }

  async getUserById(id, filter = { columns: [], type: 'normal' }) {
    return this.findById(id, filter);
  }
}

const config = {
  table: 'users',
  columns: ['id', 'username', 'email', 'password', 'created_at', 'updated_at'],
};

module.exports = new UserRepo(config);
