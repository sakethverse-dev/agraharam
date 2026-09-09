import React from 'react';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Subtle Top Ornament */}
        <div className="about-header-ornament">
          <span className="about-ornament-gem">❖</span>
        </div>

        <span className="about-subtitle">OUR STORY & VISION</span>
        
        <h2 className="about-title">
          A Journey Built with Love for Traditional, Healthy & Homemade Foods
        </h2>

        <div className="about-story-text">
          <p>
            <strong>AGRAHARAM</strong> is born from a deep love for authentic, healthy, and homemade food. We bring the timeless flavors of traditional kitchens back to your home — from crisp, golden pindi vantalu and pure ghee sweets to handcrafted, sun-cured pickles and wholesome traditional snacks.
          </p>
          <p>
            Every batch is prepared with devotion, pure desi cow ghee, wood-pressed oils, and strictly zero chemical preservatives. This is not just a business; it is a promise of uncompromising quality, taste, and trust.
          </p>
        </div>

        {/* Founder's Personal Message */}
        <div className="founder-quote-block">
          <p className="founder-quote-text">
            “I strongly believe that our friends and customers are the real brand ambassadors of AGRAHARAM. If you genuinely love our taste, your word-of-mouth support and blessings help this dream grow into something truly meaningful.”
          </p>
          <div className="founder-signature">
            <div className="founder-name">SIRAAJ MOHAMMED</div>
            <div className="founder-role">Founder – AGRAHARAM</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
