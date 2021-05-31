import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ title, author, blogId }) => {
  return (
    <div className='card grey darken-3'>
      <div className='card-content white-text'>
        <span className='card-title'>{title}</span>
        <p>by {author}</p>
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
