// Navbar Component
import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiLogOut, FiUser } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout, cart, token } = useApp();

  return (
    <nav className="navbar">
      <div className="navbar-container">
<<<<<<< HEAD
        <span className="navbar-logo">
          Tino & friends
        </span>
=======
        <Link to="/" className="navbar-logo">
          <img src="/assets/logo.png" alt="Tino and Friends Logo" /> 
          Tino and Friends
        </Link>
>>>>>>> a3ecc2f (added background logo and enhanced some Cards)

        <div className="navbar-menu">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/favorites">
            <FiHeart /> Favorites {user && <span className="badge">♥</span>}
          </Link>

          <Link to="/cart" className="cart-link">
            <FiShoppingCart /> Cart
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>

          {token ? (
            <div className="auth-menu">
              <Link to="/profile" className="user-link">
                <FiUser /> {user?.name || 'Profile'}
              </Link>
              <button onClick={logout} className="logout-btn">
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <div className="auth-menu">
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
