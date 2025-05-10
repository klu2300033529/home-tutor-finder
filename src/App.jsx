import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Modal from './components/Modal';
import Dashboard from './components/Dashboard';
import Subjects from './components/Subjects';
import TutorsBySubject from './components/Subjects';
import ContactUs from './components/ContactUs';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import './index.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login');
  const [posts, setPosts] = useState([]); // New: for managing posts

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <Router>
      <Navbar onOpenModal={openModal} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection onGetStarted={() => openModal('signup')} />
              {showModal && <Modal type={modalType} onClose={closeModal} />}
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:subjectId/tutors" element={<TutorsBySubject />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route path="/create-post" element={<CreatePost onCreate={addPost} />} />
      </Routes>
    </Router>
  );
}

export default App;
