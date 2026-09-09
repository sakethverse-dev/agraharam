import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS_SHOWCASE } from '../data/products';

function Menu() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState('next');
  const thumbnailStripRef = useRef(null);

  // Auto-slide for the moving menu showcase
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setSlideDirection('next');
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS_SHOWCASE.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Scroll thumbnail container horizontally without affecting window scroll position
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const container = thumbnailStripRef.current;
      const activeThumb = container.querySelector(`.thumb-btn-${currentIndex}`);
      if (activeThumb) {
        const targetScrollLeft =
          activeThumb.offsetLeft - container.clientWidth / 2 + activeThumb.clientWidth / 2;
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  const handlePrev = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSlideDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? PRODUCTS_SHOWCASE.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSlideDirection('next');
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS_SHOWCASE.length);
  };

  const handleSelectProduct = (index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSlideDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  const activeProduct = PRODUCTS_SHOWCASE[currentIndex];

  return (
    <section
      id="menu"
      className="menu-showcase-section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="menu-showcase-container">
        {/* Subtle Top Ornament */}
        <div className="menu-showcase-header">
          <span className="menu-header-badge">HANDCRAFTED DELICACIES</span>
          <h2 className="menu-header-heading">Our Traditional Menu</h2>
        </div>

        {/* Central Interactive Presentation Row */}
        <div className="showcase-presentation-stage">
          {/* Left Editorial Italic Phrase */}
          <div className="editorial-callout-left">
            <span key={`left-${currentIndex}`} className="editorial-callout-text">
              {activeProduct.leftCallout}
            </span>
          </div>

          {/* Center Dish with Mandala Flower Backdrop & Left/Right Arrows */}
          <div className="center-dish-anchor">
            {/* Left Circular Navigation Arrow */}
            <button
              type="button"
              className="showcase-nav-arrow arrow-left"
              onClick={handlePrev}
              aria-label="Previous Delicacy"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Center Stylized Lotus Silhouette Backdrop */}
            <div className="dish-mandala-silhouette">
              <svg viewBox="0 0 500 500" className="mandala-svg">
                <defs>
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.14" />
                  </filter>
                </defs>

                {/* Outer Warm Cream / Tan Lotus Contour */}
                <g fill="#EDE2D0" opacity="0.9" filter="url(#softShadow)">
                  <circle cx="250" cy="250" r="215" />
                  {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
                    <path
                      key={`outer-${deg}`}
                      transform={`rotate(${deg} 250 250)`}
                      d="M 210 50 C 235 15, 265 15, 290 50 C 305 90, 275 140, 250 155 C 225 140, 195 90, 210 50 Z"
                    />
                  ))}
                </g>

                {/* Inner Dark Charcoal / Black Lotus Silhouette */}
                <g fill="#18130E">
                  <circle cx="250" cy="250" r="195" />
                  {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
                    <path
                      key={`inner-${deg}`}
                      transform={`rotate(${deg} 250 250)`}
                      d="M 215 62 C 238 30, 262 30, 285 62 C 298 96, 272 142, 250 155 C 228 142, 202 96, 215 62 Z"
                    />
                  ))}
                </g>
              </svg>
            </div>

            {/* Central Circular Dish / Delicacy Presentation */}
            <div className="dish-visual-frame">
              <div key={currentIndex} className={`dish-image-wrap slide-${slideDirection}`}>
                <img
                  src={activeProduct.img}
                  alt={activeProduct.name}
                  className="dish-showcase-photo"
                />
                <div className="dish-lens-ring" />
              </div>
            </div>

            {/* Right Circular Navigation Arrow */}
            <button
              type="button"
              className="showcase-nav-arrow arrow-right"
              onClick={handleNext}
              aria-label="Next Delicacy"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Right Editorial Italic Phrase */}
          <div className="editorial-callout-right">
            <span key={`right-${currentIndex}`} className="editorial-callout-text">
              {activeProduct.rightCallout}
            </span>
          </div>
        </div>

        {/* Item Title & Narrative Description */}
        <div className="showcase-detail-block">
          <div key={`title-${currentIndex}`} className="showcase-text-transition">
            <div className="dish-telugu-pill">{activeProduct.telugu}</div>
            <h3 className="dish-title-main">{activeProduct.name}</h3>
            <p className="dish-description-narrative">{activeProduct.desc}</p>
          </div>
        </div>

        {/* Moving Thumbnail Ribbon / Quick Delicacy Switcher */}
        <div className="moving-menu-ribbon-wrapper">
          <div className="ribbon-label">SELECT DELICACY ({currentIndex + 1} / {PRODUCTS_SHOWCASE.length})</div>
          <div className="moving-thumbnails-track" ref={thumbnailStripRef}>
            {PRODUCTS_SHOWCASE.map((item, idx) => (
              <button
                type="button"
                key={item.id}
                className={`thumbnail-card-btn thumb-btn-${idx} ${idx === currentIndex ? 'active' : ''}`}
                onClick={(e) => handleSelectProduct(idx, e)}
              >
                <div className="thumb-img-wrapper">
                  <img src={item.img} alt={item.name} className="thumb-img" />
                </div>
                <span className="thumb-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
