import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import CategorySections from './CategorySections';
import BrandLogos from './BrandLogos';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/`);
        const data = await response.json();
        setProducts(data.results); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // An array of class names for our dynamic collage
  const collageClasses = [
    'collage-item-1', 'collage-item-2', 'collage-item-3', 'collage-item-4',
    'collage-item-5', 'collage-item-6', 'collage-item-7'
  ];

  return (
    <main className="main-content">
      <section className="hero-section">
        <h1>Shop with Madtiger collection</h1>
        <p>Discover the latest color palettes for the upcoming season.</p>
        <button className="hero-button">Discover it own it !</button>
      </section>

      <h2 className="section-title">Featured Products</h2>
      <section className="collage-container">
        {products.slice(0, 7).map((product, index) => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id} 
            className={`collage-item ${collageClasses[index]}`}
          >
            <img 
              src={(product.image && product.image.url) ? product.image.url : `https://via.placeholder.com/400?text=Image`}
              alt={product.name} 
              className="collage-item-image" 
            />
          </Link>
        ))}
      </section>

      <h2 className="section-title">Shop by Category</h2>
      <CategorySections />
      
      <BrandLogos />
    </main>
  );
};

export default HomePage;