import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import './CartPage.css';

const CartPage = () => {
  const { items, addItem, decreaseItem, removeItem } = useCart();

  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * parseFloat(item.price),
    0
  );

  if (items.length === 0) {
    return (
      <main className="main-content cart-page">
        <div className="empty-cart-container">
          <FiShoppingCart className="empty-cart-icon" />
          <h1 className="empty-cart-message">Your cart is empty</h1>
          <Link to="/shop" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content cart-page">
      <h1>Your Cart</h1>
      <div className="cart-table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th className="th-product">Product</th>
              <th className="th-price">Price</th>
              <th className="th-quantity">Quantity</th>
              <th className="th-total">Total</th>
              <th className="th-remove"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td data-label="Product" className="td-product">
                  <div className="cart-item-info">
                    {/* --- THIS IS THE CORRECTED LINE --- */}
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/80'} 
                      alt={item.name} 
                      className="cart-item-image" 
                    />
                    {/* --- END CORRECTION --- */}
                    <span className="cart-item-name">{item.name}</span>
                  </div>
                </td>
                <td data-label="Price" className="td-price">${parseFloat(item.price).toFixed(2)}</td>
                <td data-label="Quantity" className="td-quantity">
                  <div className="quantity-controls">
                    <button onClick={() => decreaseItem(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addItem(item)}>+</button>
                  </div>
                </td>
                <td data-label="Total" className="td-total">${(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                <td data-label="Remove" className="td-remove">
                  <button onClick={() => removeItem(item)} className="remove-btn">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-summary">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <Link to="/checkout" className="checkout-btn">
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
};

export default CartPage;