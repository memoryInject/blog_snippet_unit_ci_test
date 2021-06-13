import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ title, author, blogId }) => {
  return (
    <div className='card card-color'>
      <div className='card-content'>
        <span style={{ color: '#839496' }} className='card-title'>
          {title}
        </span>
        <p>By {author}</p>
      </div>
      <div className='card-action'>
        <Link to={`/blog/${blogId}`} className='blog-link'>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Blog;
