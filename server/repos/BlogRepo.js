const Repo = require('./Repo');

class BlogRepo extends Repo {
  async getAllBlogs() {
    return this.find();
  }

  async getAllBlogsWithUser() {
    return this.find(
      {},
      {},
      {},
      { tableName: 'users', foreignKey: 'user_id', columns: ['username'] }
    );
  }

  async getBlogById(id, filter = { columns: [], type: 'normal' }) {
    return this.findById(id, filter);
  }

  async getBlogByIdWithUser(id, filter = { columns: [], type: 'normal' }) {
    return this.find(
      filter,
      {
        column: 'id',
        value: id,
        cmp: 'eq',
      },
      {},
      { tableName: 'users', foreignKey: 'user_id', columns: ['username'] }
    );
  }

  async deleteBlogById(id) {
    return this.delete(id);
  }

  async insertBlog(data) {
    return this.insert(data);
  }

  async updateBlog(id, data) {
    return this.update(id, data);
  }
}

const config = {
  table: 'blogs',
  columns: ['id', 'created_at', 'updated_at', 'title', 'content', 'user_id'],
};

module.exports = new BlogRepo(config);
