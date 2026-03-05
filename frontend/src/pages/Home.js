// Home Page
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Tino and Friends</h1>
          <p>Artisan Bakery - Crafted with Love & Premium Ingredients</p>
          <Link to="/menu" className="cta-button">
            Explore Our Menu
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🥐</div>
          <h3>Fresh Daily</h3>
          <p>Baked fresh every morning with the finest ingredients</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Artisan Quality</h3>
          <p>Traditional recipes combined with modern techniques</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Quick Delivery</h3>
          <p>Fast and reliable delivery to your doorstep</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Secure Payment</h3>
          <p>Safe checkout with Stripe credit card payments</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Our Specialties</h2>
        <div className="category-grid">
          {['Pastries', 'Sandwiches', 'Bread', 'Beverages', 'Viennoiserie'].map(
            (category) => (
              <Link key={category} to={`/menu?category=${category}`} className="category-card">
                <div className="category-icon">
                  {category === 'Pastries' && '🥐'}
                  {category === 'Sandwiches' && '🥪'}
                  {category === 'Bread' && '🍞'}
                  {category === 'Beverages' && '☕'}
                  {category === 'Viennoiserie' && '🧁'}
                </div>
                <h3>{category}</h3>
              </Link>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Order?</h2>
        <p>Browse our fresh selection and place your order today</p>
        <Link to="/menu" className="cta-button secondary">
          Shop Now
        </Link>
      </section>
    </div>
  );
}
