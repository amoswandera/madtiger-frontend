import React, { useState, useEffect } from 'react';
import './CollectionGrid.css';

const CollectionGrid = ({ onCollectionClick, categoryFilter }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // --- THIS IS THE CORRECTED LINE ---
    let apiUrl = `${process.env.REACT_APP_API_URL}/api/collections/`;
    // --- END CORRECTION ---

    if (categoryFilter) {
      apiUrl += `?gender_category=${categoryFilter}`;
    }

    const fetchCollections = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, [categoryFilter]);

  return (
    <section className="collection-grid-container">
      {collections.map(collection => (
        <div key={collection.id} className="collection-card" onClick={() => onCollectionClick(collection.slug)}>
          <img src={collection.image} alt={collection.name} />
          <div className="card-overlay">
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
            <span className="view-collection-btn">View Collection</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CollectionGrid;