import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';

import Blog from '../components/Blog';
import AddBtn from '../components/AddBtn';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

import { listUserBlogs } from '../actions/blogActions';
import { BLOG_DELETE_CLEAR } from '../constants/blogConstants';

const MyBlogsScreen = ({ history, location, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogUser = useSelector((state) => state.blogUser);
  const { loading, error, blogs, page, pages } = blogUser;

  const blogDelete = useSelector((state) => state.blogDelete);
  const { loading: deleteLoading, error: deleteError, success } = blogDelete;

  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listUserBlogs(pageNumber));
    }

    if (success) {
      dispatch({ type: BLOG_DELETE_CLEAR });
      dispatch(listUserBlogs());
      M.toast({
        html: `<span class="material-icons" style="top:3px; color:#859900">
        check
        </span><h6 style="text-align: center">Blog deleted!</h6>`,
      });
    }
  }, [userInfo, history, dispatch, success, pageNumber]);

  return (
    <div>
      <h3 className='center-align'>My Blogs</h3>
      <AddBtn path={location.pathname} />
      {deleteLoading && <Loader />}
      {deleteError && <Message>{deleteError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        error === 'Blog(s) not found' && (
          <Message type='teal lighten-2'>
            No blogs created yet, create a new blog by press +.
          </Message>
        )
      ) : (
        <ul>
          {Array.isArray(blogs) ? (
            blogs.map((blog) => (
              <li key={blog.id}>
                <Blog
                  title={blog.title}
                  author={blog.username}
                  blogId={blog.id}
                  edit={true}
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
                edit={true}
                path={location.pathname}
              />
            </li>
          )}
        </ul>
      )}
      {pages > 1 && <Pagination page={page} pages={pages} path='/myblogs' />}
    </div>
  );
};

export default MyBlogsScreen;
