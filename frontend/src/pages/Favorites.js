// Favorites Page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { favoritesService } from '../services/api';
import { useApp } from '../context/AppContext';
import '../styles/pages/Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useApp();

  useEffect(() => {
    const loadFavorites = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await favoritesService.getFavorites();
        setFavorites(response.data.data);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [token]);

  const handleRemoveFavorite = async (productId) => {
    try {
      await favoritesService.removeFavorite(productId);
      setFavorites(favorites.filter((p) => p._id !== productId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (!token) {
    return (
      <div className="favorites-page">
        <div className="not-logged-in">
          <h2>Please log in to view your favorites</h2>
          <Link to="/login" className="login-link">
            Login Here
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="loading">Loading favorites...</div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="empty-favorites">
          <h2>No favorites yet</h2>
          <p>Start adding products to your favorites!</p>
          <Link to="/menu" className="shop-link">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <h1>My Favorites</h1>
        <div className="favorites-grid">
          {favorites.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddFavorite={handleRemoveFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
