import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import OrderSection from './components/OrderSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Phone number state for ordering (can be customized)
  const [phoneNumber, setPhoneNumber] = useState("+91 80089 44894");

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

      {/* Interactive Order Section (Delicacies Grid + Pack Sizes + Add to Cart) */}
      <OrderSection
        phoneNumber={phoneNumber}
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Contact Section Component (Normal & Bulk Orders) */}
      <Contact phoneNumber={phoneNumber} />

      {/* Site Footer Component */}
      <Footer scrollToSection={scrollToSection} phoneNumber={phoneNumber} />

      {/* Floating Bottom Cart Pill when items are in cart */}
      {totalCartItems > 0 && !isCartOpen && (
        <button
          type="button"
          className="floating-cart-pill"
          onClick={() => setIsCartOpen(true)}
          aria-label="View Cart"
        >
          <div className="floating-cart-left">
            <span className="floating-cart-badge">{totalCartItems}</span>
            <span className="floating-cart-icon">❖</span>
            <span className="floating-cart-text">View Cart</span>
          </div>
          <span className="floating-cart-total">₹{cartSubtotal} →</span>
        </button>
      )}

      {/* Slide-out Cart Drawer Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        phoneNumber={phoneNumber}
      />
    </div>
  );
}

export default App;
