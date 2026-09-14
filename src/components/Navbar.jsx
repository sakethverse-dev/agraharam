import React from 'react';
import logoImg from '../assets/logo.jpg';

function Navbar({ activeTab, scrollToSection, isScrolled }) {
  const isOnHero = activeTab === 'Home';

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${isOnHero ? 'header-on-hero' : 'header-on-light'}`}>
      <nav className="nav-wrapper">
        {/* Left Navigation Links */}
        <div className="nav-group">
          <button
            type="button"
            className={`nav-link ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home', 'Home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'About' ? 'active' : ''}`}
            onClick={() => scrollToSection('about', 'About')}
          >
            About
          </button>
        </div>

        {/* Center AGRAHARAM Brand Logo */}
        <a
          href="#"
          className="nav-logo-center"
          aria-label="AGRAHARAM Home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home', 'Home');
          }}
        >
          <div className="logo-badge-wrapper">
            <img
              src={logoImg}
              alt="AGRAHARAM Logo"
              className="nav-brand-logo-img"
            />
          </div>
        </a>

        {/* Right Navigation Links */}
        <div className="nav-group">
          <button
            type="button"
            className={`nav-link ${activeTab === 'Menu' ? 'active' : ''}`}
            onClick={() => scrollToSection('menu', 'Menu')}
          >
            Menu
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'Contact' ? 'active' : ''}`}
            onClick={() => scrollToSection('contact', 'Contact')}
          >
            Contact
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
