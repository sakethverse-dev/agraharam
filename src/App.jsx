import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Phone number state for ordering (can be customized)
  const [phoneNumber, setPhoneNumber] = useState("+91 80089 44894");

  // Detect active section on scroll & track header background state
  useEffect(() => {
    const handleScroll = () => {
      // Toggle header compact/glass state
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = [
        { id: 'home', name: 'Home' },
        { id: 'about', name: 'About' },
        { id: 'menu', name: 'Menu' },
        { id: 'contact', name: 'Contact' }
      ];

      const scrollPos = window.scrollY + 140; // Offset for fixed navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveTab(sections[i].name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId, tabName) => {
    setActiveTab(tabName);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="page-container">
      {/* Fixed Navigation Header Component */}
      <Navbar
        activeTab={activeTab}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
      />

      {/* Hero / Home Section Component */}
      <Home />

      {/* About Section Component */}
      <About />

      {/* Moving Menu Showcase Component */}
      <Menu />

      {/* Contact Section Component (Normal & Bulk Orders) */}
      <Contact phoneNumber={phoneNumber} />

      {/* Site Footer Component */}
      <Footer scrollToSection={scrollToSection} phoneNumber={phoneNumber} />
    </div>
  );
}

export default App;
