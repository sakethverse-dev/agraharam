import React, { useState } from 'react';

function Contact({ phoneNumber = "+91 80089 44894" }) {
  const [orderType, setOrderType] = useState('normal');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    items: '',
    quantity: '',
    eventDate: '',
    notes: ''
  });

  const rawPhone = phoneNumber.replace(/[^0-9]/g, '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const typeLabel = orderType === 'bulk' ? 'BULK / EVENT ORDER' : 'NORMAL / HOUSEHOLD ORDER';
    const message = `🌿 *NEW ORDER INQUIRY - AGRAHARAM* 🌿\n\n` +
      `*Order Type:* ${typeLabel}\n` +
      `*Customer Name:* ${formData.name || 'Not specified'}\n` +
      `*Contact Phone:* ${formData.phone || 'Not specified'}\n` +
      `*Selected Items:* ${formData.items || 'All traditional snacks'}\n` +
      `*Quantity / Pack Size:* ${formData.quantity || 'Standard'}\n` +
      (orderType === 'bulk' && formData.eventDate ? `*Event / Requirement Date:* ${formData.eventDate}\n` : '') +
      (formData.notes ? `*Special Notes:* ${formData.notes}\n` : '') +
      `\n_Sent via AGRAHARAM Website_`;

    const url = `https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(message)}`;
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
          <span className="contact-subtitle">DIRECT ORDERING & INQUIRIES</span>
          <h2 className="contact-title">We Gladly Accept Normal & Bulk Orders</h2>
          <p className="contact-description">
            Handcrafted with pure desi cow ghee, wood-pressed oils, and zero preservatives.
            Freshly prepared upon your order for your daily household cravings or grand festive celebrations.
          </p>
        </div>

        {/* Two Service Pillars: Normal vs Bulk Orders */}
        <div className="order-pillars-grid">
          {/* Normal Orders Card */}
          <div
            className={`order-pillar-card ${orderType === 'normal' ? 'active' : ''}`}
            onClick={() => setOrderType('normal')}
          >
            <div className="pillar-badge">DAILY CRAVINGS</div>
            <h3 className="pillar-title">Normal / Household Orders</h3>
            <p className="pillar-desc">
              Authentic homemade snacks, pindi vantalu, sweets & pickles for your home and family.
            </p>
            <ul className="pillar-highlights">
              <li>✓ Freshly prepared in small artisanal batches</li>
              <li>✓ Available in 250g, 500g & 1kg packs</li>
              <li>✓ Pure taste with zero chemical preservatives</li>
            </ul>
            <div className="pillar-action">
              <span className="pillar-select-tag">
                {orderType === 'normal' ? '● Selected Order Type' : 'Click to Select'}
              </span>
            </div>
          </div>

          {/* Bulk Orders Card */}
          <div
            className={`order-pillar-card ${orderType === 'bulk' ? 'active' : ''}`}
            onClick={() => setOrderType('bulk')}
          >
            <div className="pillar-badge bulk-badge">CELEBRATIONS & EVENTS</div>
            <h3 className="pillar-title">Bulk / Event Catering Orders</h3>
            <p className="pillar-desc">
              Festive celebrations, weddings, housewarmings (Gruhapravesam), poojas, and corporate gifting.
            </p>
            <ul className="pillar-highlights">
              <li>✓ Customized festive hamper boxes & packaging</li>
              <li>✓ Special bulk wholesale pricing discounts</li>
              <li>✓ Advance pre-booking & scheduled fresh delivery</li>
            </ul>
            <div className="pillar-action">
              <span className="pillar-select-tag">
                {orderType === 'bulk' ? '● Selected Order Type' : 'Click to Select'}
              </span>
            </div>
          </div>
        </div>

        {/* Direct Contact Cards & Interactive Order Form */}
        <div className="contact-interaction-wrapper">
          {/* Left Column: Direct Call & WhatsApp Info */}
          <div className="contact-info-panel">
            <div className="contact-direct-card">
              <div className="direct-card-icon">📞</div>
              <div className="direct-card-body">
                <span className="direct-card-label">ORDER & INQUIRY HOTLINE</span>
                <a href={`tel:${rawPhone || '918008944894'}`} className="direct-card-value">
                  {phoneNumber}
                </a>
                <span className="direct-card-sub">Direct Call / WhatsApp Assistance</span>
              </div>
            </div>

            <div className="contact-direct-card">
              <div className="direct-card-icon">💬</div>
              <div className="direct-card-body">
                <span className="direct-card-label">WHATSAPP INSTANT ORDER</span>
                <a
                  href={`https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(
                    'Hello AGRAHARAM, I would like to place an order!'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-whatsapp-btn"
                >
                  Contact on WhatsApp 💬
                </a>
                <span className="direct-card-sub">Quick responses within minutes</span>
              </div>
            </div>

            <div className="contact-direct-card">
              <div className="direct-card-icon">🌿</div>
              <div className="direct-card-body">
                <span className="direct-card-label">HOMEMADE ASSURANCE</span>
                <p className="direct-card-text">
                  “Prepared fresh upon order with pure desi cow ghee, wood-pressed oils, and traditional recipes.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Order WhatsApp Form */}
          <div className="contact-form-panel">
            <div className="form-header">
              <h4 className="form-title">
                {orderType === 'bulk' ? 'Bulk / Event Order Inquiry' : 'Quick Order Form'}
              </h4>
              <p className="form-subtitle">
                Fill the details below to generate an instant WhatsApp order message.
              </p>
            </div>

            <form onSubmit={handleWhatsAppSend} className="quick-order-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sridhar Rao"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
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
                <label htmlFor="items" className="form-label">
                  Items Desired (Appadalu, Chekkalu, Murukulu, Laddu, Pickles, etc.)
                </label>
                <input
                  type="text"
                  id="items"
                  name="items"
                  value={formData.items}
                  onChange={handleChange}
                  placeholder="e.g. 1kg Chekkalu, 500g Ghee Laddu, 1 jar Avakaya"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Total Quantity / Weight</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder={orderType === 'bulk' ? 'e.g. 15 kg / 50 hampers' : 'e.g. 2 kg total'}
                    className="form-input"
                  />
                </div>
                {orderType === 'bulk' ? (
                  <div className="form-group">
                    <label htmlFor="eventDate" className="form-label">Event / Required Date</label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="deliveryCity" className="form-label">Delivery Location</label>
                    <input
                      type="text"
                      id="deliveryCity"
                      name="deliveryCity"
                      placeholder="e.g. Hyderabad / Vijayawada"
                      className="form-input"
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">Special Instructions / Customization (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any spice preference, gift packaging, or delivery timing..."
                  className="form-textarea"
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                <span>Send Order via WhatsApp</span>
                <span className="submit-btn-icon">📲</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
