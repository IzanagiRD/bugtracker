import React from 'react';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-container">
      <div className="contact-inner">
        <h1 className="contact-title">Contact Us</h1>
        
        <p className="intro-text">
          We're here to help you with any questions or issues you may have. Feel free to reach out to us using the contact details below, 
          and our team will get back to you as soon as possible. We strive to provide excellent support and ensure your experience with Bug Tracker is seamless.
        </p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3 className="contact-heading">Phone Support</h3>
            <p className="contact-description">
              If you prefer to speak with someone directly, feel free to call us at the number below. Our phone support is available during business hours.
            </p>
            <a href="tel:+12345678901" className="contact-link">+1 234-567-8901</a>
          </div>

          <div className="contact-item">
            <h3 className="contact-heading">Email Support</h3>
            <p className="contact-description">
              For any inquiries, technical issues, or general questions, you can reach us by email. Our team is always ready to assist you and will respond within 24 hours.
            </p>
            <a href="mailto:BugTracker@gmail.com" className="contact-link">BugTracker@gmail.com</a>
          </div>

          <div className="contact-item">
            <h3 className="contact-heading">Business Hours</h3>
            <p className="contact-description">
              Our team is available Monday through Friday from 9 AM to 6 PM (UTC). We aim to respond to all inquiries promptly during these hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
