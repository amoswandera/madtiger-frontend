import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import PaymentForm from './PaymentForm';

// --- THIS IS THE FIRST FIX ---
// Load your Stripe publishable key from the environment variable
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    address: '', city: '', postal_code: '',
  });

  // Fetch the Payment Intent client secret from your server
  useEffect(() => {
    if (items.length > 0 && token) {
      // --- THIS IS THE SECOND FIX ---
      // Use the environment variable for the API call
      fetch(`${process.env.REACT_APP_API_URL}/api/create-payment-intent/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ items: items.map(item => ({ id: item.id, quantity: item.quantity })) }),
      })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(error => console.error("Error creating payment intent:", error));
    }
  }, [items, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevData => ({ ...prevData, [name]: value }));
  };

  // This function is called AFTER Stripe confirms the payment
  const handleSuccessfulPayment = async (paymentIntentId) => {
    const orderItems = items.map(item => ({ product: item.id, quantity: item.quantity }));
    const orderData = { ...shippingInfo, items: orderItems, stripe_id: paymentIntentId };

    try {
      // --- THIS IS THE THIRD FIX ---
      // Use the environment variable for the API call
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Failed to save the order.');

      clearCart();
      alert('Your order has been placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert(`There was an error saving your order: ${error.message}`);
    }
  };
  
  // The Order Summary JSX needs to be added back in
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  return (
    <main className="main-content">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-container">
        <div className="shipping-form-section">
          <h2>Shipping Address</h2>
          <div className="shipping-form">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="postal_code">Postal Code</label>
              <input type="text" id="postal_code" name="postal_code" value={shippingInfo.postal_code} onChange={handleInputChange} required />
            </div>
          </div>

          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm onPaymentSuccess={handleSuccessfulPayment} />
            </Elements>
          )}
        </div>
        {/* --- THIS SECTION IS RESTORED --- */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {items.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </div>
        {/* --- END RESTORED SECTION --- */}
      </div>
    </main>
  );
};

export default CheckoutPage;