import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listBlogs } from '../actions/blogActions';
import Blog from '../components/Blog';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AddBtn from '../components/AddBtn';
import Pagination from '../components/Pagination';
import Meta from '../components/Meta';

const HomeScreen = ({ location, match }) => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs, page, pages } = blogList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listBlogs(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <div>
      <Meta />
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
                  path={location.pathname}
                />
              </li>
            ))
          ) : (
            <li key={blogs.id}>
              <Blog
                title={blogs.title}
                author={blogs.username}
                blogId={blogs.id}
                path={location.pathname}
              />
            </li>
          )}
        </ul>
      )}
      {pages > 1 && <Pagination page={page} pages={pages} />}
    </div>
  );
};

export default HomeScreen;
