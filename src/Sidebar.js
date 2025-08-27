// src/Sidebar.js (Final, Definitive Responsive Version)

import React, { useState } from 'react';
import './Sidebar.css';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import logoImage from './assets/m-tiger-logo.png'; // Make sure this path is correct
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the menu, useful when navigating
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <img src={logoImage} alt="Madtiger Clothings Logo" />
        </Link>
        
        {/* Container for icons on the right */}
        <div className="header-icons-container">
          <Link to="/cart" className="cart-icon-link" onClick={closeMobileMenu}>
            <div className="cart-icon">
              <FiShoppingCart size={24} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
          </Link>

          <button className="hamburger-menu-button" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Wrapper for content that will be hidden on mobile */}
      <div className="sidebar-content-wrapper">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/" onClick={closeMobileMenu} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/shop" onClick={closeMobileMenu} className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link></li>
            {/* ... other links ... */}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {user ? (
            <div className="user-info">
              <Link to="/profile" onClick={closeMobileMenu} className="user-info-link">
                <span>Welcome, {user.username}!</span>
              </Link>
              <button onClick={() => { logout(); closeMobileMenu(); }} className="logout-button">Logout</button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMobileMenu} className="login-link">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;