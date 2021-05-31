import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogScreen = ({ match }) => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await axios.get(`/api/blogs/${match.params.id}`);

      setBlog(data);
    };
    fetchBlog();
  }, [match.params.id]);

  return (
    <>
      <div style={{ margin: '5px auto' }}>
        <Link to='/' className='btn waves-effect waves-light btn-back'>
          <span
            className='material-icons'
            style={{ position: 'relative', top: '6px' }}
          >
            arrow_back_ios
          </span>
          Go Back
        </Link>
      </div>
      <div className='card grey darken-4'>
        <div className='card-content white-text'>
          <span className='card-title'>
            <h4 className='center-align'>{blog.title}</h4>
          </span>
          <p style={{ fontSize: '1.2rem' }}>{blog.body}</p>
          <br></br>
          <p>by author</p>
        </div>
      </div>
    </>
  );
};

export default BlogScreen;
