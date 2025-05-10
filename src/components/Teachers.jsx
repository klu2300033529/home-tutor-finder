// src/components/Teachers.jsx
import React from 'react';

const teachers = [
  {
    name: "Aarav Mehta",
    subject: "Mathematics",
    experience: 5,
    fees: "₹500/hr",
    timing: "10:00 AM - 12:00 PM",
  },
  {
    name: "Sneha Rao",
    subject: "Physics",
    experience: 8,
    fees: "₹700/hr",
    timing: "2:00 PM - 4:00 PM",
  },
  {
    name: "Rahul Sen",
    subject: "English",
    experience: 6,
    fees: "₹600/hr",
    timing: "5:00 PM - 7:00 PM",
  },
];

const Teachers = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ textAlign: 'center' }}>Available Teachers</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', flexWrap: 'wrap' }}>
        {teachers.map((teacher, index) => (
          <div key={index} style={cardStyle}>
            <h3>{teacher.name}</h3>
            <p><strong>Subject:</strong> {teacher.subject}</p>
            <p><strong>Experience:</strong> {teacher.experience} years</p>
            <p><strong>Fees:</strong> {teacher.fees}</p>
            <p><strong>Timing:</strong> {teacher.timing}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  margin: '10px',
  width: '280px',
  textAlign: 'left',
};

export default Teachers;
