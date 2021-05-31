import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from '../components/Blog';
const HomeScreen = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get('/api/blogs');
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h3 className='center-align'>Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog title={blog.title} author='author' blogId={blog.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
