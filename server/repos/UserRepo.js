const Repo = require('./Repo');
const bcrypt = require('bcryptjs');

class UserRepo extends Repo {
  // Login user
  async authUser(data) {
    const config = {
      condition: {
        column: 'email',
        value: data.email,
        cmp: 'eq',
      },
    };

    const user = await this.find(config);

    // Compare password
    if (await bcrypt.compare(data.password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }

  // Register a user
  async createUser(data) {
    if (!data.password || !data.username || !data.email) {
      throw new Error('email, password and username are required!');
    }

    data.password = bcrypt.hashSync(data.password, 10);
    const row = await this.insert(data);
    if (row.password) {
      delete row.password;
    }

    return row;
  }

  async getAllUsers() {
    return await this.find({ columns: ['password'], type: 'invert' });
  }

  async getUserById(id, filter = { columns: [], type: 'normal' }) {
    return await this.findById(id, filter);
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

  async getUserByEmail(email) {
    const config = {
      condition: {
        column: 'email',
        value: email,
        cmp: 'eq',
      },
    };
    let user = await this.find(config);

    if (user && Object.keys(user).length) {
      return user;
    } else {
      return (user = null);
    }
  }
}

const config = {
  table: 'users',
  columns: ['id', 'username', 'email', 'password', 'created_at', 'updated_at'],
};

module.exports = new UserRepo(config);
