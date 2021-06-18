import React, { useState, useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { useDispatch } from 'react-redux';

import { updateBlog, createBlog } from '../actions/blogActions';

const BlogEdit = ({ id, title, content, author, update }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const textareaElem = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (refresh) {
      setBlogTitle(title ? title : '');
      setBlogContent(content ? content : '');
      setRefresh(false);
    }

    // Using a setTimeout will fix Labels overlapping prefilled content in Materialize.
    // Also add className='active' to labels
    const timerId = setTimeout(() => {
      M.updateTextFields();
      if (!previewMode) {
        M.textareaAutoResize(textareaElem.current);
      }
    }, 0);
    return () => clearTimeout(timerId);
  }, [previewMode, content, title, refresh]);

  const previewHandler = (e) => {
    e.preventDefault();
    setPreviewMode(true);
  };

  const editHandler = (e) => {
    e.preventDefault();
    setPreviewMode(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (update) {
      dispatch(updateBlog(id, { title: blogTitle, content: blogContent }));
    } else {
      dispatch(createBlog({ title: blogTitle, content: blogContent }));
    }
  };

  return (
    <div className='form-container'>
      {previewMode ? (
        <>
          <div className='card card-color'>
            <div className='card-content'>
              <span className='card-title'>
                <h4 className='center-align'>{blogTitle}</h4>
              </span>
              <p style={{ fontSize: '1.2rem' }} className='card-content-color'>
                {blogContent}
              </p>
              <br></br>
              <p className='card-footer-color'>By {author}</p>
            </div>
          </div>

          <div className='row right'>
            <div className='col s-6'>
              <button className='btn btn-yellow' onClick={editHandler}>
                Edit
              </button>
            </div>

            <div className='col s-6'>
              <button className='btn btn-yellow' onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='blog-title'
                  type='text'
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
                <label htmlFor='blog-title' className='active'>
                  Blog Title
                </label>
              </div>

              <div className='row blog-edit-textarea'>
                <div className='input-field col s12'>
                  <textarea
                    ref={textareaElem}
                    id='blog-content'
                    className='materialize-textarea'
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                  ></textarea>
                  <label htmlFor='blog-content' className='active'>
                    Blog Content
                  </label>
                </div>
              </div>
            </div>

            <div className='row right'>
              <div className='col s12'>
                <button className='btn btn-yellow' onClick={previewHandler}>
                  Preview
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogEdit;
