// ProductCard Component
import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import '../styles/ProductCard.css';

export default function ProductCard({ product, onAddFavorite, isFavorite }) {
  const { addToCart } = useApp();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-overlay">
          <button
            className="favorite-btn"
            onClick={(e) => {
              e.preventDefault();
              onAddFavorite(product._id);
            }}
          >
            <FiHeart fill={isFavorite ? '#c41e3a' : 'none'} />
          </button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="description">{product.description.substring(0, 60)}...</p>

        {(product.ingredients?.length > 0 || product.allergens?.length > 0) && (
          <div style={{ fontSize: '12px', marginTop: '5px', marginBottom: '10px', color: '#555' }}>
            {product.ingredients?.length > 0 && <p style={{ margin: 0 }}><strong>Ingredients:</strong> {product.ingredients.join(', ')}</p>}
            {product.allergens?.length > 0 && <p style={{ margin: 0, color: '#d32f2f' }}><strong>Allergens:</strong> {product.allergens.join(', ')}</p>}
          </div>
        )}

        <div className="product-footer">
          <span className="price">{product.price.toFixed(2)} EGP</span>
          <span className="rating">⭐ {product.rating || 4.5}</span>
        </div>
      </div>
    </Link>
  );
}
