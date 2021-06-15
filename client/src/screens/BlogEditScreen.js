import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';

import BlogEdit from '../components/BlogEdit';
import Message from '../components/Message';
import Loader from '../components/Loader';
import BackBtn from '../components/BackBtn';

import { BLOG_UPDATE_CLEAR } from '../constants/blogConstants';

const BlogEditScreen = ({ history, location, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogUser = useSelector((state) => state.blogUser);
  const { blogs } = blogUser;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { loading, error, success } = blogUpdate;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    if (!userInfo || !blogs) {
      history.push('/login');
    }

    const getBlog = blogs.filter(
      (blog) => blog.id === parseInt(match.params.id)
    )[0];

    setEditBlog(getBlog);

    if (!getBlog) {
      history.push('/login');
    }

    if (success) {
      dispatch({ type: BLOG_UPDATE_CLEAR });
      history.push(`/blog/${match.params.id}?redirect=/myblogs`);
      M.toast({
        html: `<span class="material-icons" style="top:3px; color:#859900">
        check
        </span><h6 style="text-align: center">Blog updated!</h6>`,
      });
    }
  }, [userInfo, history, match, success, blogs, dispatch]);

  return (
    <div>
      <h3 className='center-align'>Edit Blog</h3>
      <BackBtn redirect={redirect} />

      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {editBlog && userInfo && (
        <BlogEdit
          id={match.params.id}
          title={editBlog.title}
          content={editBlog.content}
          author={userInfo.username}
          update={true}
        />
      )}
    </div>
  );
};

export default BlogEditScreen;
