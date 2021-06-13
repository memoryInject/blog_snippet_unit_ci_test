import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBlogs } from '../actions/blogActions';
import Blog from '../components/Blog';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);

  const { loading, error, blogs } = blogList;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  return (
    <div>
      <h3 className='center-align'>Blogs</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='red'>{error}</Message>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Blog
                title={blog.title}
                author={blog.username}
                blogId={blog.id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeScreen;
