// This is an example of what your RegisterPage.js might look like.
// If your file is different, just apply the fetch URL change.

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // --- THIS IS THE CORRECTED LINE ---
      // Use the environment variable for the API call
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      // --- END CORRECTION ---

      const data = await response.json();

      if (!response.ok) {
        // Handle potential validation errors from Django REST Framework
        const errorMessage = Object.values(data).join('\n');
        throw new Error(errorMessage || 'Registration failed.');
      }

      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page after successful registration

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="main-content">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-button">Register</button>
          <p className="auth-switch-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;