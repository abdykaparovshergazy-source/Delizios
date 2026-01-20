import React, { useState } from 'react';
import './contact1.css';

function Contact1() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [modalOpen, setModalOpen] = useState(false); // Модалдык окно үчүн
  const [modalMessage, setModalMessage] = useState(''); // Модалга чыгаруучу текст

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Модалдык окно ачуу
    setModalMessage('Thank you for contacting us!');
    setModalOpen(true);

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact us</h1>
      <p className="contact-subtitle">
        We love hearing from our customers. Feel free to share your experience or ask <br />
        any questions you may have.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-row">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="contact-row">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box">
            <p>{modalMessage}</p>
            <button onClick={() => setModalOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact1;
