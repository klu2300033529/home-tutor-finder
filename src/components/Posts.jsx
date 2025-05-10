import React from 'react';
import './Posts.css';

const Posts = ({ posts }) => {
  return (
    <div className="posts-container">
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="post-author">— {post.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
