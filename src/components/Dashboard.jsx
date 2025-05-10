import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import ContactUs from './ContactUs';


const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', reason: '' });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeSection, setActiveSection] = useState('subjects');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    studentClass: '',
  });

  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/user?email=${email}`);
        const { firstName, lastName } = response.data;
        setUserDetails({ firstName, lastName });
        setFormData((prev) => ({
          ...prev,
          name: `${firstName} ${lastName}`,
          email: email,
        }));
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    if (email) fetchUserDetails();
  }, [email]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/subjects');
        setSubjects(response.data);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    };

    fetchSubjects();
  }, []);

  const handleProfileClick = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/');
  };

  const handleFindTutor = async () => {
    setSelectedSubject(null);
    try {
      const response = await axios.get('http://localhost:8080/api/subjects/all-tutors');
      setTutors(response.data);
      setActiveSection('tutors');
    } catch (err) {
      console.error('Error fetching all tutors:', err);
    }
  };

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);
    setLoadingTutors(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/subjects/${subject.id}/tutors`);
      setTutors(response.data);
      setActiveSection('tutors');
    } catch (err) {
      console.error('Error fetching tutors:', err);
    } finally {
      setLoadingTutors(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setContactInfo({ name: '', email: '', reason: '' });
    setActiveSection('subjects');
  };

  const openRegisterPopup = (tutor) => {
    setSelectedTutor(tutor);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setFormData((prev) => ({
      ...prev,
      phone: '',
      school: '',
      studentClass: '',
    }));
  };

  const handlePopupChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        tutorId: selectedTutor.id,
        studentEmail: formData.email,
        name: formData.name,
        phone: formData.phone,
        school: formData.school,
        studentClass: formData.studentClass,
      };
      await axios.post('http://localhost:8080/api/registration', payload);
      alert(`Successfully registered with ${selectedTutor.name}!`);
      closePopup();
    } catch (err) {
      console.error('Error submitting registration:', err);
      alert('Failed to register.');
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="nav-left">
          <a href="#" onClick={() => setActiveSection('subjects')}>Home</a>
          <a href="#" onClick={handleFindTutor}>Find Tutor</a>
          <a href="#" onClick={() => setActiveSection('subjects')}>Subjects</a>
          <a href="#" onClick={() => setActiveSection('about')}>About Us</a>
          < a href="#" onClick={() => setActiveSection('contact')} className="link-button">Contact Us</a>
        </div>
        <div className="nav-right">
          <div className="user-info">
            <span>{userDetails.firstName} {userDetails.lastName}</span>
          </div>
          <div className="profile-section">
            <button className="profile-icon" onClick={handleProfileClick}>
              <img src="image.png" alt="profile" className="profile-pic" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Profile</button>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {activeSection === 'subjects' && (
          <section className="subjects-container">
            <h2 className="av">Available Subjects</h2>
            <div className="subjects-grid">
              {subjects.map((subject) => (
                <div key={subject.id} className="subject-card" onClick={() => handleSubjectClick(subject)}>
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'tutors' && (
          <section className="tutors-container">
            <h2>{selectedSubject ? `Available Tutors for ${selectedSubject.name}` : 'All Available Tutors'}</h2>
            {loadingTutors ? (
              <p>Loading tutors...</p>
            ) : (
              <div className="tutors-grid">
                {tutors.map((tutor) => (
                  <div key={tutor.id} className="tutor-card">
                    <img
                      src={`http://localhost:8080${tutor.imagePath}`}
                      alt={tutor.name}
                      className="tutor-image"
                      style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => {
                        if (e.target.src !== window.location.origin + '/default-image.png') {
                          e.target.src = '/default-image.png';
                        }
                      }}
                    />
                    <h3>{tutor.name}</h3>
                    <p><strong>Experience:</strong> {tutor.experience}</p>
                    <p><strong>Subjects:</strong> {tutor.subjects}</p>
                    <p><strong>Location:</strong> {tutor.location}</p>
                    <p><strong>Availability:</strong> {tutor.availability}</p>
                    <p><strong>Available Days:</strong> {tutor.availableDays}</p>
                    <p><strong>Available Time:</strong> {tutor.availableTime}</p>
                    <button className="register-button" onClick={() => openRegisterPopup(tutor)}>Register</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
 {activeSection === 'contact' && (
          <section className="contact-form-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <input type="text" name="name" value={contactInfo.name} onChange={handleContactChange} placeholder="Your Name" required />
              <input type="email" name="email" value={contactInfo.email} onChange={handleContactChange} placeholder="Your Email" required />
              <textarea name="reason" value={contactInfo.reason} onChange={handleContactChange} placeholder="Reason for Contact" rows="4" required></textarea>
              <button type="submit" onClick={ContactUs} >Submit</button>
            </form>
          </section>
        )}


        {activeSection === 'about' && (
          <section className="about-section">
            <h2>About Us</h2>
            <p>
              Welcome to our Online Tutor Platform! We aim to connect students with experienced and qualified tutors in various subjects to ensure academic success.
            </p>
            <div className="about-grid">
              <div className="about-card">
                <img src="/image1.jpg" alt="Project Role 1" className="about-image" />
                <h3>Project Role 1</h3>
                <p>This section introduces the first role of the project and its contribution.</p>
              </div>
              <div className="about-card">
                <img src="/image2.jpg" alt="Project Role 2" className="about-image" />
                <h3>Project Role 2</h3>
                <p>This section introduces the second role of the project and its contribution.</p>
              </div>
              <div className="about-card">
                <img src="/image3.jpg" alt="Project Role 3" className="about-image" />
                <h3>Project Role 3</h3>
                <p>This section introduces the third role of the project and its contribution.</p>
              </div>
            </div>
          </section>
        )}

       {/* Register Popup */}
{showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      {/* Add the close button (X) here */}
      <button type="button" onClick={closePopup} className="popup-close-btn">
        &times; {/* This is the HTML entity for the '×' symbol */}
      </button>

      <h3>Register with {selectedTutor.name}</h3>
      <form onSubmit={handlePopupSubmit} className="popup-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label> {/* Added htmlFor for accessibility */}
          <input id="name" type="text" name="name" value={formData.name} onChange={handlePopupChange} placeholder="Your Name" required readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handlePopupChange} placeholder="Your Email" required readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input id="phone" type="text" name="phone" value={formData.phone} onChange={handlePopupChange} placeholder="Phone Number" required />
        </div>

        <div className="form-group">
          <label htmlFor="school">School:</label>
          <input id="school" type="text" name="school" value={formData.school} onChange={handlePopupChange} placeholder="School" required />
        </div>

        <div className="form-group">
          <label htmlFor="studentClass">Class:</label>
          <input id="studentClass" type="text" name="studentClass" value={formData.studentClass} onChange={handlePopupChange} placeholder="Class" required />
        </div>

        {/* Only the submit button now */}
        <div className="popup-buttons">
          <button type="submit" className="submit-btn">Submit</button>
          {/* Cancel button is removed */}
        </div>
      </form>
    </div>
  </div>
)}
 {/* Rest of your main content and closing tags */}
      </main>
    </div>
  );
};

export default Dashboard;
