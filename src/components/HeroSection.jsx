import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // Keeps your existing styles

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/teachers');
  };

  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Learn from the Best Tutors Online</h1>
        <button className="get-started" onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;
