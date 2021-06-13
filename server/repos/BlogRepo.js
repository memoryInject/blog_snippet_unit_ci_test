const Repo = require('./Repo');

class BlogRepo extends Repo {
  // Get all blogs
  async getAllBlogs() {
    return await this.find();
  }

  // Get all the blogs and it's user name from postgres
  async getAllBlogsWithUser() {
    const config = {
      filter: {
        columns: [
          'id',
          'created_at',
          'updated_at',
          'title',
          'content',
          'user_id',
        ],
        type: 'normal',
      },
      join: {
        tableName: 'users',
        foreignKey: 'user_id',
        columns: ['username'],
      },
    };

    return await this.find(config);
  }

  // Get a blog by id
  async getBlogById(id, filter = { columns: [], type: 'normal' }) {
    return await this.findById(id, filter);
  }

  // Get a blog by id and it's username (author)
  async getBlogByIdWithUser(
    id,
    filter = {
      columns: [
        'id',
        'created_at',
        'updated_at',
        'title',
        'content',
        'user_id',
      ],
      type: 'normal',
    }
  ) {
    const config = {
      filter,
      condition: {
        column: 'id',
        value: id,
        cmp: 'eq',
      },
      join: {
        foreignKey: 'user_id',
        tableName: 'users',
        columns: ['username'],
      },
    };
    return await this.find(config);
  }

  async deleteBlogById(id) {
    return await this.delete(id);
  }

  async insertBlog(data) {
    return await this.insert(data);
  }

  async updateBlog(id, data) {
    return await this.update(id, data);
  }

  async blogCount() {
    const rows = await this.countRows();
    return parseInt(rows.count);
  }
}

const config = {
  table: 'blogs',
  columns: ['id', 'created_at', 'updated_at', 'title', 'content', 'user_id'],
};

module.exports = new BlogRepo(config);
