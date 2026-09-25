import React from 'react';
import logoImg from '../assets/logo.jpg';

function Footer({ scrollToSection, phoneNumber = "+91 80089 44894" }) {
  const rawPhone = phoneNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Brand Block */}
        <div className="footer-brand-row">
          <div className="footer-logo-wrap">
            <img src={logoImg} alt="AGRAHARAM Logo" className="footer-logo-img" />
          </div>
          <div className="footer-brand-title">AGRAHARAM</div>
          <div className="footer-tagline-telugu">సాంప్రదాయం • రుచి • అనుబంధం</div>
          <div className="footer-tagline-sub">Handcrafted Traditional Homemade Delicacies</div>
        </div>

        {/* Footer Navigation & Details */}
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => scrollToSection('home', 'Home')}>Home</button></li>
              <li><button type="button" onClick={() => scrollToSection('menu', 'Menu')}>Our Delicacies & Menu</button></li>
              <li><button type="button" onClick={() => scrollToSection('about', 'About')}>About Story</button></li>
              <li><button type="button" onClick={() => scrollToSection('contact', 'Contact')}>Contact & Inquiries</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Our Offerings</h4>
            <ul className="footer-links-list">
              <li>Papadalu & Vadiyalu</li>
              <li>Traditional Andhra Pickles</li>
              <li>Farm-Fresh Ragi & Millet Pindilu</li>
              <li>Aromatic Karivepaku Podi</li>
              <li>Pure Moringa Powder</li>
              <li>Organic Nuvvulu & Provisions</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Orders & Connect</h4>
            <p className="footer-text">
              Direct hotline & WhatsApp for all normal household orders and bulk festive catering:
            </p>
            <a href={`tel:${rawPhone || '918008944894'}`} className="footer-phone-link">
              Call / WhatsApp: {phoneNumber}
            </a>
            <div className="footer-social-links-wrap">
              <a
                href={`https://wa.me/${rawPhone || '918008944894'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-link"
              >
                Contact on WhatsApp →
              </a>
              <a
                href="https://www.instagram.com/the.agraharam?stkn=YzcyNnBjdGViandt"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-insta-link"
                title="Follow AGRAHARAM on Instagram"
              >
                <svg className="footer-social-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram: @the.agraharam →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-founder-credit">
            Founded by <strong>SIRAAJ MOHAMMED</strong>
          </div>
          <a
            href="https://www.instagram.com/the.agraharam?stkn=YzcyNnBjdGViandt"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-bottom-insta"
          >
            Follow @the.agraharam
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
