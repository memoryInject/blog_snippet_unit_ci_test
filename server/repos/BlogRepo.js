const Repo = require('./Repo');

class BlogRepo extends Repo {
  // Get all blogs
  async getAllBlogs() {
    return await this.find();
  }

  // Get all the blogs and it's user name from postgres
  async getAllBlogsWithUser(pageSize = 5, page = 1) {
    const { count } = await this.countRows();
    const pages = Math.ceil(count / pageSize);

    // Check if the page is greater than total pages
    page = page > pages ? pages : page;

    // Check if the page is less than 1
    page = page < 1 ? 1 : page;

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
      limiter: {
        limit: pageSize,
        offset: pageSize * (page - 1),
      },
    };

    const blogs = await this.find(config);

    return { blogs, page, pages };
  }

  // Get blogs by its user
  async getBlogsbyUser(userId, pageSize = 5, page = 1) {
    // Config for getting all blogs by the user
    let config = {
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

      condition: {
        column: 'user_id',
        value: userId,
        cmp: 'eq',
      },

      join: {
        tableName: 'users',
        foreignKey: 'user_id',
        columns: ['username'],
      },
    };

    let count = await this.find(config);

    if (Array.isArray(count)) {
      count = count.length;
    } else {
      count = 1;
    }

    // Total page
    const pages = Math.ceil(count / pageSize);

    // Check if the page is greater than total pages
    page = page > pages ? pages : page;

    // Check if the page is less than 1
    page = page < 1 ? 1 : page;

    // Config for getting all blogs by the user with limit
    config = {
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

      condition: {
        column: 'user_id',
        value: userId,
        cmp: 'eq',
      },

      join: {
        tableName: 'users',
        foreignKey: 'user_id',
        columns: ['username'],
      },
      limiter: {
        limit: pageSize,
        offset: pageSize * (page - 1),
      },
    };

    // Get blogs by the user with limit
    const blogs = await this.find(config);

    return { blogs, page, pages };
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
    data.updated_at = 'NOW()';
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
