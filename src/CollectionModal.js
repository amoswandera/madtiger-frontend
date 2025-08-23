import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import './CollectionModal.css';

const CollectionModal = ({ collectionSlug, onClose }) => {
  const [collection, setCollection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!collectionSlug) return;
    const fetchCollectionDetail = async () => {
      try {
        // --- THIS IS THE CORRECTED LINE ---
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/collections/${collectionSlug}/`);
        // --- END CORRECTION ---
        
        const data = await response.json();
        setCollection(data);
      } catch (error) {
        console.error("Error fetching collection details:", error);
      }
    };
    fetchCollectionDetail();
  }, [collectionSlug]);

  if (!collection) return null;

  const products = collection.products || [];
  const goToPrevious = () => setCurrentIndex(prev => (prev === 0 ? products.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex(prev => (prev === products.length - 1 ? 0 : prev + 1));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><FiX size={30} /></button>
        {products.length > 0 ? (
          <div className="carousel-container">
            <button className="carousel-arrow prev" onClick={goToPrevious}><FiChevronLeft size={40} /></button>
            <div className="carousel-slide">
              <img src={products[currentIndex].image} alt={products[currentIndex].name} />
              <h3>{products[currentIndex].name}</h3>
              <p>${parseFloat(products[currentIndex].price).toFixed(2)}</p>
              <Link to={`/product/${products[currentIndex].id}`} className="details-link-btn" onClick={onClose}>
                View Full Details
              </Link>
            </div>
            <button className="carousel-arrow next" onClick={goToNext}><FiChevronRight size={40} /></button>
          </div>
        ) : (
          <p>This collection has no products yet.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionModal;