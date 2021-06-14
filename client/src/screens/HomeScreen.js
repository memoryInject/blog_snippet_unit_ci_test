import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBlogs } from '../actions/blogActions';
import Blog from '../components/Blog';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AddBtn from '../components/AddBtn';

const HomeScreen = ({ location }) => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  return (
    <div>
      <h3 className='center-align'>Blogs</h3>
      {userInfo && <AddBtn path={location.pathname} />}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='red'>{error}</Message>
      ) : (
        <ul>
          {Array.isArray(blogs) ? (
            blogs.map((blog) => (
              <li key={blog.id}>
                <Blog
                  title={blog.title}
                  author={blog.username}
                  blogId={blog.id}
                />
              </li>
            ))
          ) : (
            <li key={blogs.id}>
              <Blog
                title={blogs.title}
                author={blogs.username}
                blogId={blogs.id}
              />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default HomeScreen;
