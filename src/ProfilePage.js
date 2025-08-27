import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/`, {
        headers: { 'Authorization': `Token ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.results || data || []); 
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchOrders();
    }
  }, [token, navigate]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
        return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/cancel/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}` 
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel order.');
      }
      alert('Order cancelled successfully!');
      fetchOrders(); 
    } catch (error) {
      alert(error.message);
    }
  };

  const isCancellable = (order) => {
    if (order.status !== 'processing') {
      return false;
    }
    const orderDate = new Date(order.created);
    const twelveHoursLater = new Date(orderDate.getTime() + 12 * 60 * 60 * 1000);
    return new Date() < twelveHoursLater;
  };

  if (loading) {
    return <main className="main-content"><h2>My Orders</h2><p>Loading your order history...</p></main>;
  }

  return (
    <main className="main-content">
      <h1 className="profile-title">My Orders</h1>
      <div className="order-history-container">
        {orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <strong>Order #{order.id}</strong>
                  <p>Placed on: {new Date(order.created).toLocaleString()}</p>
                </div>
                <div className={`order-status-badge status-${order.status}`}>
                  {order.status}
                </div>
              </div>
              
              <div className="order-card-body">
                {order.items && order.items.map(item => (
                  <div key={item.product.id} className="order-item">
                    {/* --- THIS IS THE CORRECTED LINE --- */}
                    <img 
                      src={item.product.image_url || 'https://via.placeholder.com/80'} 
                      alt={item.product.name} 
                      className="order-item-image" 
                    />
                    {/* --- END CORRECTION --- */}
                    <div className="order-item-details">
                      <p><strong>{item.product.name}</strong></p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {isCancellable(order) && (
                <div className="order-card-footer">
                  <button onClick={() => handleCancelOrder(order.id)} className="cancel-order-btn">
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default ProfilePage;