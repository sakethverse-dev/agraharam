import React, { useState } from 'react';

function Contact({ phoneNumber = "+91 80089 44894" }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: 'General Inquiry',
    message: '',
    website_hp: '' // Honeypot bot trap
  });

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rawPhone = phoneNumber.replace(/[^0-9]/g, '');

  const sanitizeInput = (text) => {
    if (!text) return '';
    return text.replace(/[<>]/g, '').trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError('');
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenConfirmation = (e) => {
    e.preventDefault();

    // Honeypot check: If bot filled the hidden honeypot, ignore silently
    if (formData.website_hp) {
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanMessage) {
      setFormError('Please enter your Name and Message.');
      return;
    }

    setFormError('');
    setShowConfirmModal(true);
  };

  const confirmAndSendInquiry = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowConfirmModal(false);

    const cleanName = sanitizeInput(formData.name);
    const cleanSubject = sanitizeInput(formData.subject);
    const cleanMessage = sanitizeInput(formData.message);

    const text =
      `*GENERAL INQUIRY - AGRAHARAM*\n\n` +
      `*Name:* ${cleanName || 'Not specified'}\n` +
      `*Topic:* ${cleanSubject}\n` +
      `*Message:* ${cleanMessage || 'Hello, I have an inquiry regarding AGRAHARAM.'}\n\n` +
      `_Sent via AGRAHARAM Website_`;

    const url = `https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(text)}`;
    
    // Reverse tabnabbing protection with explicit noopener,noreferrer
    window.open(url, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
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
            Have questions about our traditional recipes, custom batch preparation, or need general assistance? Send us a message below and we will connect with you promptly.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-interaction-wrapper">
          {/* General Inquiry Form */}
          <div className="contact-form-panel">
            <div className="form-header">
              <h4 className="form-title">Send Us a Message</h4>
              <p className="form-subtitle">
                Fill in your details below and we will get back to you promptly via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleOpenConfirmation} className="quick-order-form">
              {formError && (
                <div style={{
                  background: '#FFF3F3',
                  border: '1px solid #E57373',
                  color: '#C62828',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  marginBottom: '16px'
                }}>
                  • {formError}
                </div>
              )}

              {/* Honeypot Spam Trap (Hidden from real users) */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
                aria-hidden="true"
              />

              <div className="form-group">
                <label htmlFor="inquiry-name" className="form-label">Your Name *</label>
                <input
                  type="text"
                  id="inquiry-name"
                  name="name"
                  maxLength={80}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-input"
                  required
                />
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
                <label htmlFor="inquiry-message" className="form-label">Your Message *</label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  maxLength={600}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today? Ask any questions or share your requirements..."
                  className="form-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Opening WhatsApp...' : 'Send Message via WhatsApp'}</span>
                <span className="submit-btn-icon">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* WhatsApp Inquiry Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-backdrop" onClick={() => setShowConfirmModal(false)}>
          <div className="confirmation-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-ornament">❖</div>
              <h3 className="confirm-modal-title">Confirm WhatsApp Inquiry</h3>
              <p className="confirm-modal-subtitle">
                Review your inquiry details before connecting to WhatsApp.
              </p>
            </div>

            <div className="confirm-modal-body">
              <div className="confirm-detail-row">
                <span className="confirm-detail-label">From:</span>
                <strong className="confirm-detail-val">{formData.name}</strong>
              </div>
              <div className="confirm-detail-row">
                <span className="confirm-detail-label">Topic:</span>
                <strong className="confirm-detail-val">{formData.subject}</strong>
              </div>
              <div className="confirm-detail-row">
                <span className="confirm-detail-label">Message:</span>
                <p className="confirm-detail-text">"{formData.message}"</p>
              </div>
            </div>

            <div className="confirm-modal-actions">
              <button
                type="button"
                className="confirm-cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                Edit Message
              </button>
              <button
                type="button"
                className="confirm-proceed-btn"
                onClick={confirmAndSendInquiry}
              >
                <span>Confirm & Send on WhatsApp</span>
                <span className="confirm-btn-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;
