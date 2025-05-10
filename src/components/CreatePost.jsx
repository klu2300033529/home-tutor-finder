import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && title && body) {
      onCreate({ name, title, body });
      navigate('/posts');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

