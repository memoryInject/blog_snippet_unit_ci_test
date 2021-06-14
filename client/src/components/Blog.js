import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteBlog } from '../actions/blogActions';

const Blog = ({ title, author, blogId, edit, path }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteBlog(blogId));
    }
  };

  return (
    <div className='card card-color'>
      <div className='card-content'>
        <span style={{ color: '#839496' }} className='card-title'>
          {title}
        </span>
        <p>By {author}</p>
      </div>
      <div className='card-action'>
        <Link to={`/blog/${blogId}?redirect=${path}`} className='blog-link'>
          Read More
        </Link>
        {edit && (
          <>
            <Link
              to='#!'
              onClick={deleteHandler}
              className='blog-link-del right'
            >
              <span
                className='material-icons'
                style={{
                  fontSize: '27px',
                  top: '-2px',
                  color: '#dc322f',
                  marginRight: '10px',
                  marginLeft: '0px',
                }}
              >
                delete_forever
              </span>
            </Link>
            <Link to={`/blog/${blogId}/edit`} className='blog-link-edit right'>
              <span
                className='material-icons'
                style={{
                  fontSize: '30px',
                  top: '-3px',
                  color: '#2aa198',
                  marginLeft: '0px',
                  marginRight: '0px',
                }}
              >
                edit_note
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
