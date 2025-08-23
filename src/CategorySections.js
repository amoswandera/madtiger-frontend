// src/CategorySections.js
import React from 'react';
import { Link } from 'react-router-dom'; // <-- IMPORT LINK
import './CategorySections.css';
import { FaVenus, FaMars, FaVenusMars } from 'react-icons/fa';

const CategorySections = () => {
  return (
    <section className="category-section-container">
      {/* Each card is now a Link to the new collections page */}
      <Link to="/collections/her" className="category-box her">
        <FaVenus className="category-icon" />
        <h2>Fashion for her</h2>
        <p>Feminine and stylish quality clothes for the amazing woman of today.</p>
        <span className="details-button">View Details</span>
      </Link>
      <Link to="/collections/him" className="category-box him">
        <FaMars className="category-icon" />
        <h2>Style for him</h2>
        <p>Masculine and modern outfits for the distinguished gentleman.</p>
        <span className="details-button">View Details</span>
      </Link>
      <Link to="/collections/them" className="category-box them">
        <FaVenusMars className="category-icon" />
        <h2>Fancy for them</h2>
        <p>Versatile and inclusive fashion choices for every individual's unique style.</p>
        <span className="details-button">View Details</span>
      </Link>
    </section>
  );
};

export default CategorySections;