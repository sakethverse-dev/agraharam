import React, { useState } from 'react';

function Contact({ phoneNumber = "+91 80089 44894" }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const rawPhone = phoneNumber.replace(/[^0-9]/g, '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text =
      `🌿 *GENERAL INQUIRY - AGRAHARAM* 🌿\n\n` +
      `*Name:* ${formData.name || 'Not specified'}\n` +
      `*Phone:* ${formData.phone || 'Not specified'}\n` +
      `*Topic:* ${formData.subject}\n` +
      `*Message:* ${formData.message || 'Hello, I have an inquiry regarding AGRAHARAM.'}\n\n` +
      `_Sent via AGRAHARAM Website_`;

    const url = `https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <div className="contact-ornament">
            <span className="contact-ornament-gem">❖</span>
          </div>
          <span className="contact-subtitle">GET IN TOUCH</span>
          <h2 className="contact-title">Contact & Inquiries</h2>
          <p className="contact-description">
            Have questions about our traditional recipes, custom batch preparation, or need general assistance? Reach out to us directly through phone, WhatsApp, or the inquiry form below.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-interaction-wrapper">
          {/* Left Column: Direct Contact Information */}
          <div className="contact-info-panel">
            <div className="contact-direct-card">
              <div className="direct-card-icon">📞</div>
              <div className="direct-card-body">
                <span className="direct-card-label">DIRECT PHONE LINE</span>
                <a href={`tel:${rawPhone || '918008944894'}`} className="direct-card-value">
                  {phoneNumber}
                </a>
                <span className="direct-card-sub">Available Mon – Sun, 9:00 AM – 9:00 PM</span>
              </div>
            </div>

            <div className="contact-direct-card">
              <div className="direct-card-icon">💬</div>
              <div className="direct-card-body">
                <span className="direct-card-label">INSTANT WHATSAPP ASSISTANCE</span>
                <a
                  href={`https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(
                    'Hello AGRAHARAM, I have an inquiry.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-whatsapp-btn"
                >
                  Contact on WhatsApp 💬
                </a>
                <span className="direct-card-sub">Chat directly with founder Siraaj Mohammed</span>
              </div>
            </div>

            <div className="contact-direct-card">
              <div className="direct-card-icon">📍</div>
              <div className="direct-card-body">
                <span className="direct-card-label">KITCHEN LOCATION</span>
                <p className="direct-card-text">
                  Hyderabad, Telangana, India
                </p>
                <span className="direct-card-sub">Artisanal homemade batches prepared fresh upon request</span>
              </div>
            </div>
          </div>

          {/* Right Column: General Inquiry Form */}
          <div className="contact-form-panel">
            <div className="form-header">
              <h4 className="form-title">Send Us a Message</h4>
              <p className="form-subtitle">
                Fill in your details below and we will get back to you promptly via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="quick-order-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inquiry-name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="inquiry-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sridhar Rao"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inquiry-phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="inquiry-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 98480 12345"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-subject" className="form-label">Topic / Inquiry Type</label>
                <select
                  id="inquiry-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bulk & Event Catering Question">Bulk & Event Catering Question</option>
                  <option value="Custom Taste / Packaging Request">Custom Taste / Packaging Request</option>
                  <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-message" className="form-label">Your Message</label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today? Ask any questions or share your requirements..."
                  className="form-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                <span>Send Message via WhatsApp</span>
                <span className="submit-btn-icon">💬</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
