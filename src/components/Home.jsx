import React, { useState, useMemo, useEffect } from 'react';
import heroFoodImg from '../assets/hero_food.jpg';
import { TAGLINES } from '../data/products';

function Home() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Smooth periodic tagline rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Symmetrical 8-petal Lotus Flower Silhouette
  const lotusPath = useMemo(() => {
    const cx = 400;
    const cy = 350;
    const numPetals = 8;
    const rTipX = 340;
    const rTipY = 300;
    const rValley = 195;
    const rShoulder = 270;

    let d = '';
    const toRad = (deg) => (deg * Math.PI) / 180;

    for (let i = 0; i < numPetals; i++) {
      const angleTip = i * (360 / numPetals) - 90;
      const angleV1 = angleTip - (180 / numPetals);
      const angleV2 = angleTip + (180 / numPetals);

      const v1x = cx + rValley * Math.cos(toRad(angleV1)) * 1.1;
      const v1y = cy + rValley * Math.sin(toRad(angleV1));

      const tipX = cx + rTipX * Math.cos(toRad(angleTip));
      const tipY = cy + rTipY * Math.sin(toRad(angleTip));

      const v2x = cx + rValley * Math.cos(toRad(angleV2)) * 1.1;
      const v2y = cy + rValley * Math.sin(toRad(angleV2));

      const cp1x = cx + rShoulder * Math.cos(toRad(angleTip - 14)) * 1.08;
      const cp1y = cy + rShoulder * Math.sin(toRad(angleTip - 14));
      const cp2x = cx + (rTipX + 2) * Math.cos(toRad(angleTip - 3.5));
      const cp2y = cy + (rTipY + 2) * Math.sin(toRad(angleTip - 3.5));

      const cp3x = cx + (rTipX + 2) * Math.cos(toRad(angleTip + 3.5));
      const cp3y = cy + (rTipY + 2) * Math.sin(toRad(angleTip + 3.5));
      const cp4x = cx + rShoulder * Math.cos(toRad(angleTip + 14)) * 1.08;
      const cp4y = cy + rShoulder * Math.sin(toRad(angleTip + 14));

      if (i === 0) {
        d += `M ${v1x.toFixed(2)} ${v1y.toFixed(2)} `;
      }

      d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${tipX.toFixed(2)} ${tipY.toFixed(2)} `;
      d += `C ${cp3x.toFixed(2)} ${cp3y.toFixed(2)}, ${cp4x.toFixed(2)} ${cp4y.toFixed(2)}, ${v2x.toFixed(2)} ${v2y.toFixed(2)} `;
    }

    d += 'Z';
    return d;
  }, []);

  return (
    <main id="home" className="hero-section">
      <div className="hero-flower-container">
        {/* Soft Golden Ambient Glow */}
        <div className="flower-ambient-glow" />

        {/* SVG Mask with South Indian Delicacy & Subtle Atmosphere */}
        <svg
          className="flower-svg-wrapper"
          viewBox="0 0 800 700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="lotusClip">
              <path d={lotusPath} />
            </clipPath>

            <linearGradient id="foodAtmosphere" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A0806" stopOpacity="0.88" />
              <stop offset="35%" stopColor="#120D08" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
            </linearGradient>

            <radialGradient id="centerHighlight" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          <g clipPath="url(#lotusClip)">
            <image
              className="animated-food-image"
              href={heroFoodImg}
              x="0"
              y="0"
              width="800"
              height="700"
              preserveAspectRatio="xMidYMid slice"
            />
            <rect x="0" y="0" width="800" height="700" fill="url(#foodAtmosphere)" />
            <rect x="0" y="0" width="800" height="700" fill="url(#centerHighlight)" />
          </g>

          <path
            d={lotusPath}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.2"
            opacity="0.35"
          />
        </svg>

        {/* Minimalist Editorial Typography Overlay */}
        <div className="hero-text-overlay">
          <span className="hero-subtitle-minimal">WELCOME TO</span>
          <h1 className="hero-brand-minimal">AGRAHARAM</h1>
          
          <div className="hero-divider-minimal">
            <span className="divider-line"></span>
            <span className="divider-gem">❖</span>
            <span className="divider-line"></span>
          </div>

          <div className="hero-tagline-rotator">
            <span key={taglineIndex} className="hero-tagline-text">
              {TAGLINES[taglineIndex]}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
