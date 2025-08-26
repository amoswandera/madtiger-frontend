import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // --- THIS IS THE FIRST FIX ---
  // Use the environment variable for the initial URL
  const initialUrl = `${process.env.REACT_APP_API_URL}/api/products/`;

  // Reusable fetch function - no changes needed here as it handles full URLs from pagination
  const fetchProducts = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.results);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch the list of categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // --- THIS IS THE SECOND FIX ---
        // Use the environment variable for the categories API call
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories/`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Effect to re-fetch products when the category filter changes
  useEffect(() => {
    let url = initialUrl;
    if (selectedCategory) {
      url = `${initialUrl}?category=${selectedCategory}`;
    }
    fetchProducts(url);
  }, [selectedCategory]);

  // Handlers for pagination - no changes needed
  const handleNextPage = () => nextPageUrl && fetchProducts(nextPageUrl);
  const handlePrevPage = () => prevPageUrl && fetchProducts(prevPageUrl);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) {
    return <main className="main-content"><h1>Shop</h1><p>Loading...</p></main>;
  }

  // The JSX part of the component remains exactly the same
  return (
    <main className="main-content">
      <div className="shop-header">
        <h1 className="shop-title">Shop All Products</h1>
        <div className="filter-container">
          <select onChange={handleCategoryChange} value={selectedCategory} className="category-filter">
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="product-grid-shop">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
            <div className="product-card">
             
              <img 
                src={(product.image && product.image.url) ? product.image.url : 'https://via.placeholder.com/400?text=No+Image'} 
                alt={product.name} 
                className="product-card-image"
              />
              // ...
              <div className="product-card-info">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={!prevPageUrl}>&larr; Previous</button>
        <button onClick={handleNextPage} disabled={!nextPageUrl}>Next &rarr;</button>
      </div>
    </main>
  );
};

export default ShopPage;