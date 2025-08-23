// src/CollectionsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CollectionGrid from './CollectionGrid';
import CollectionModal from './CollectionModal';

const CollectionsPage = () => {
  const { category } = useParams(); // Gets 'her', 'him', or 'them' from the URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollectionSlug, setSelectedCollectionSlug] = useState(null);

  const handleCollectionClick = (slug) => {
    setSelectedCollectionSlug(slug);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCollectionSlug(null);
  };

  // Create a title based on the URL category
  const title = `Collections for ${category}`;

  return (
    <main className="main-content">
      <h1 className="section-title" style={{ textTransform: 'capitalize' }}>{title}</h1>
      <CollectionGrid onCollectionClick={handleCollectionClick} categoryFilter={category} />

      {isModalOpen && (
        <CollectionModal collectionSlug={selectedCollectionSlug} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default CollectionsPage;