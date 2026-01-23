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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const whatsappNumber = "996552411160"; // <-- бул жерге сенин WhatsApp номериңди жаз

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    // WhatsApp үчүн текст даярдоо
    const whatsappText = `
New Contact Message:
Name: ${fullName}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}
    `.trim();

    // WhatsApp URL (URL encode)
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    // WhatsApp ачуу
    window.open(whatsappURL, '_blank');

    // Модал ачуу
    setModalMessage('Your message has been sent via WhatsApp!');
    setModalOpen(true);

    // Форманы тазалоо
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
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contact-row">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
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
