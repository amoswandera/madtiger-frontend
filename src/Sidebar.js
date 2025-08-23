// src/Sidebar.js (Full, Corrected Version with ALL Fixes)

import React from 'react';
import './Sidebar.css';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import logoImage from './assets/m-tiger-logo.png'; // Make sure this path is correct
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { items } = useCart();
  const { user, logout } = useAuth();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={logoImage} alt="Madtiger Clothings Logo" />
        </div>
        
        <Link to="/cart" className="cart-icon-link">
          <div className="cart-icon">
            <FiShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
        </Link>

      </div>

      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link></li>
          <li><a href="/">Events</a></li>
          <li><a href="/">Courses</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/">Pricing</a></li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        {user ? (
          // If a user exists, show this block:
          <div className="user-info">
            <Link to="/profile" className="user-info-link">
              <span>Welcome, {user.username}!</span>
            </Link>
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        ) : (
          // If no user exists, show this block:
          <Link to="/login" className="login-link">
            Login / Register
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;