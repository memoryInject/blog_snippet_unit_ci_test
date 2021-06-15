import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import BackBtn from '../components/BackBtn';

import { listBlogDetails } from '../actions/blogActions';

const BlogScreen = ({ match, location }) => {
  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const redirect = location.search
    ? location.search.split('=')[1] === 'undefined'
      ? '/'
      : location.search.split('=')[1]
    : '/';

  useEffect(() => {
    dispatch(listBlogDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <BackBtn redirect={redirect} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='red'>{error}</Message>
      ) : (
        <div className='card card-color'>
          <div className='card-content'>
            <span className='card-title'>
              <h4 className='center-align'>{blog.title}</h4>
            </span>
            <p style={{ fontSize: '1.2rem' }} className='card-content-color'>
              {blog.content}
            </p>
            <br></br>
            <p className='card-footer-color'>By {blog.username}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogScreen;
