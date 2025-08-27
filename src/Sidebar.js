// src/Sidebar.js (Final Responsive Version with Hamburger Menu)

import React, { useState } from 'react'; // Import useState
import './Sidebar.css';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi'; // Import Menu and X icons
import { Link, useLocation } from 'react-router-dom';
import logoImage from './assets/m-tiger-logo.png';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control the mobile menu

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // We add a class to the sidebar when the mobile menu is open
    <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="Madtiger Clothings Logo" />
          </Link>
        </div>

        <div className="mobile-header-icons">
            <Link to="/cart" className="cart-icon-link">
              <div className="cart-icon">
                <FiShoppingCart size={24} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </div>
            </Link>

            {/* Hamburger Menu Icon - only visible on mobile */}
            <button className="hamburger-menu-button" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>
      </div>
      
      {/* --- The rest of the sidebar is now wrapped in a container for mobile view --- */}
      <div className="sidebar-content-wrapper">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/shop" onClick={toggleMobileMenu} className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link></li>
            {/* Add onClick handlers to close menu on navigation */}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {user ? (
            <div className="user-info">
              <Link to="/profile" onClick={toggleMobileMenu} className="user-info-link">
                <span>Welcome, {user.username}!</span>
              </Link>
              <button onClick={() => { logout(); toggleMobileMenu(); }} className="logout-button">Logout</button>
            </div>
          ) : (
            <Link to="/login" onClick={toggleMobileMenu} className="login-link">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;