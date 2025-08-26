import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useProducts } from './ProductContext';
import './ProductDetailPage.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}/`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      alert(`${product.name} has been added to the cart!`);
    }
  };

  const currentIndex = products.findIndex(p => p.id === parseInt(id));
  const prevProductId = currentIndex > 0 ? products[currentIndex - 1].id : null;
  const nextProductId = currentIndex < products.length - 1 ? products[currentIndex + 1].id : null;

  if (loading) {
    return <main className="main-content"><p>Loading...</p></main>;
  }
  if (!product) {
    return <main className="main-content"><p>Product not found.</p></main>;
  }

  return (
    <main className="main-content">
      <div className="product-detail-layout">
        {prevProductId && (
          <button className="nav-arrow prev" onClick={() => navigate(`/product/${prevProductId}`)}>
            <FiChevronLeft size={40} />
          </button>
        )}

        <div className="product-detail-container">
          <div className="product-image-section">
            {/* --- THIS IS THE CORRECTED LINE --- */}
            <img 
              src={(product.image && product.image.url) ? product.image.url : 'https://via.placeholder.com/600x800?text=No+Image'} 
              alt={product.name} 
            />
            {/* --- END CORRECTION --- */}
          </div>
          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="price">${parseFloat(product.price).toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        {nextProductId && (
          <button className="nav-arrow next" onClick={() => navigate(`/product/${nextProductId}`)}>
            <FiChevronRight size={40} />
          </button>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage;