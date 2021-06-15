import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';

import BlogEdit from '../components/BlogEdit';
import Message from '../components/Message';
import Loader from '../components/Loader';
import BackBtn from '../components/BackBtn';

import { BLOG_CREATE_CLEAR } from '../constants/blogConstants';

const BlogCreateScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogCreate = useSelector((state) => state.blogCreate);
  const { loading, error, success, newBlog } = blogCreate;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (success) {
      dispatch({ type: BLOG_CREATE_CLEAR });
      history.push(`/blog/${newBlog.id}?redirect=${redirect}`);
      M.toast({
        html: `<span class="material-icons" style="top:3px; color:#859900">
        check
        </span><h6 style="text-align: center">Blog created!</h6>`,
      });
    }
  }, [userInfo, history, success, dispatch, newBlog, redirect]);

  return (
    <div>
      <h3 className='center-align'>Create Blog</h3>
      <BackBtn redirect={redirect} />

      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {userInfo && <BlogEdit author={userInfo.username} />}
    </div>
  );
};

export default BlogCreateScreen;
