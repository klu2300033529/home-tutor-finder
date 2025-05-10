// ContactUs.js
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css'; // ✅ Optional: use your existing styling

const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_i4flnti', 'template_icr72em', form.current, {
        publicKey: 'xkydo-0fNWkRicnJL',
      })
      .then(
        () => {
          setStatus('SUCCESS');
          form.current.reset(); // ✅ reset form fields
        },
        (error) => {
          setStatus('FAILED');
          console.error('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label>Name</label>
        <input type="text" name="name:" placeholder="Your Name" required />

        <label>Email</label>
        <input type="email" name="email:" placeholder="Your Email" required />

        <label>Message</label>
        <textarea name="Reason:" placeholder="Reason for contacting us" required />

        <input type="submit" value="Send" />
      </form>

      {status === 'SUCCESS' && <p className="form-message success">Thank you! Your message has been sent.</p>}
      {status === 'FAILED' && <p className="form-message error">Sorry, there was an error. Please try again.</p>}
    </div>
  );
};

export default ContactUs;