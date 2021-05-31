import React from "react";

const Blog = ({ title, author }) => {
  return (
    <div className="card grey darken-3">
      <div className="card-content white-text">
        <span className="card-title">{title}</span>
        <p>by {author}</p>
      </div>
      <div className="card-action">
        <a href="#!" className="blog-link">
          Read More
        </a>
      </div>
    </div>
  );
};

export default Blog;
