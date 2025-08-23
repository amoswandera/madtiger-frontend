// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProductDetailPage from './ProductDetailPage';
import Sidebar from './Sidebar';
import ShopPage from './ShopPage';
import CartPage from './CartPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import CheckoutPage from './CheckoutPage';
import ProfilePage from './ProfilePage';
import CollectionsPage from './CollectionsPage';

function App() {
  return (
    <BrowserRouter>
      {/* Sidebar is placed here so it's visible on all pages */}
      <Sidebar />
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the product detail page, with a dynamic 'id' parameter */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/collections/:category" element={<CollectionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;