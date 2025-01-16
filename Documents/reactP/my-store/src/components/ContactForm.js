import React from 'react';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import '../css/ContactForm.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name){
            setError('name is required');
            return;
        }
        if(!email.includes('@')){
            setError('email must contain @');
            return;
        }
       
        alert(`ההודעה שלך נשלחה!`);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-wrapper">
            <div className="contact-container">
                <h3>Have a question? Feel free to contact us any time...</h3>
                <h4>Use one of the following channels or fill out the contact form below
                    and we'll get back to you as soon as we can.</h4>
               
                <div className="contact-info">
                    <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <a href="tel:+15169868605">(516) 986-8605</a>
                    </div>
                   
                    <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <a href="mailto:info@packforcamp.com">info@packforcamp.com</a>
                    </div>
                   
                    <div className="contact-item">
                        <FaWhatsapp className="contact-icon" />
                        <a href="https://wa.me/15169868605">WhatsApp Message</a>
                    </div>
                </div>









































                  <form onSubmit={handleSubmit}>
                      <div className="input-container">
                          <label htmlFor="name">שם:</label>
                          <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder='put in your name'
                              required 
                          />
                      </div>
                    
                      <div className="input-container">
                          <label htmlFor="email">אימייל:</label>
                          <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                      </div>
                    
                      <div className="input-container">
                          <label htmlFor="message">הודעה:</label>
                          <textarea
                              id="message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder='put in your message'
                              required
                          />
                      </div>
                    
                      <div className="button-container">
                          <button type="submit">שלח</button>
                      </div>
                  </form>
              </div>
        </div>
    );
};

export default ContactForm;
