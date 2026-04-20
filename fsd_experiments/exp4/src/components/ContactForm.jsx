import React, { useState } from 'react';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }
    
    if (message.length < 5) {
      setError('Message must be at least 5 characters');
      return;
    }

    setSuccess('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="contact-form">
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="text" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea 
          id="message"
          value={message} 
          onChange={e => setMessage(e.target.value)} 
        />
      </div>
      <button type="submit">Submit</button>
      
      {error && <div data-testid="error-message" style={{ color: 'red' }}>{error}</div>}
      {success && <div data-testid="success-message" style={{ color: 'green' }}>{success}</div>}
    </form>
  );
};

export default ContactForm;
