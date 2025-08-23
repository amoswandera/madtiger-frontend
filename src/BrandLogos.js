// src/BrandLogos.js
import React from 'react';
import './BrandLogos.css';

const BrandLogos = () => {
  return (
    <section className="brand-logos-container">
      <h2>Our top brands</h2>
      <p>We partner with the best in the industry.</p>
      <div className="logos">
        {/* Replace these with <img> tags of your brand logos later */}
        <span>Nairobi</span>
        <span>Mombasa</span>
        <span>Kisumu</span>
        <span>Nakuru</span>
        <span>Kakamega</span>
        <span>Busia</span>
      </div>
    </section>
  );
};
export default BrandLogos;