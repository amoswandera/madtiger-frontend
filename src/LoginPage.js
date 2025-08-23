import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // --- THIS IS THE CORRECTED LINE ---
      // Use the environment variable for the API call
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      // --- END CORRECTION ---

      const data = await response.json();

      if (!response.ok) {
        // Use the specific error message from Django if it exists
        throw new Error(data.non_field_errors?.[0] || 'Login failed. Please check your username and password.');
      }

      // We get all user details from the successful login response
      const user = {
        id: data.user_id,
        email: data.email,
        username: data.username, // Use the username from the response
        first_name: data.first_name,
        last_name: data.last_name,
      };
      
      login(user, data.token);

      navigate('/');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="main-content">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-button">Login</button>
          <p className="auth-switch-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;