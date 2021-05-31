import React from "react";
import blogs from "../blogs";
import Blog from "../components/Blog";
const HomeScreen = () => {
  return (
    <div>
      <h3 className="center-align">Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog title={blog.title} author="author" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
