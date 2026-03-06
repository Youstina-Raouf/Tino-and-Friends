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
        {[
          { title: 'Fresh Daily', text: 'Baked fresh every morning with the finest ingredients', image: '/images/features/fresh_daily.png', emoji: '🥐' },
          { title: 'Artisan Quality', text: 'Traditional recipes combined with modern techniques', image: '/images/features/artisan_quality.png', emoji: '🎨' },
          { title: 'Quick Delivery', text: 'Fast and reliable delivery to your doorstep', image: '/images/features/quick_delivery.png', emoji: '⚡' }
        ].map((feature) => (
          <div key={feature.title} className="feature-card">
            <div
              className="feature-image"
              style={{ backgroundImage: `url(${feature.image})` }}
            >
              {!feature.image && <div className="feature-icon">{feature.emoji}</div>}
            </div>
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="categories">
        <h2>Our Specialties</h2>
        <div className="category-grid">
          {[
            { name: 'Viennoiserie', image: '/images/categories/viennoiserie.png', emoji: '🧁' },
            { name: 'Sandwiches', image: '/images/categories/sandwiches.png', emoji: '🥪' },
            { name: 'Bread', image: '/images/categories/bread.png', emoji: '🍞' },
            { name: 'Beverages', image: '/images/categories/beverages.png', emoji: '☕' },
            { name: 'Salad', image: '/images/categories/salad.png', emoji: '🥗' }
          ].map((cat) => (
            <Link key={cat.name} to={`/menu?category=${cat.name}`} className="category-card">
              <div
                className="category-image"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                {!cat.image && <span className="fallback-emoji">{cat.emoji}</span>}
              </div>
              <div className="category-overlay">
                <h3>{cat.name}</h3>
              </div>
            </Link>
          ))}
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
