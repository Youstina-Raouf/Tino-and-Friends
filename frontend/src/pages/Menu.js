// Menu Page
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { productService, favoritesService } from '../services/api';
import { useApp } from '../context/AppContext';
import '../styles/pages/Menu.css';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useApp();
  const [searchParams] = useSearchParams();

  // Load products and favorites
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const productsResponse = await productService.getProducts();
        setProducts(productsResponse.data.data);

        // Check for category in URL
        const category = searchParams.get('category');
        if (category) {
          setSelectedCategory(category);
        }

        // Load favorites if user is logged in
        if (token) {
          try {
            const favResponse = await favoritesService.getFavorites();
            setFavorites(
              favResponse.data.data.map((item) => item._id)
            );
          } catch (error) {
            console.log('Could not load favorites');
          }
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token, searchParams]);

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  // Handle add favorite
  const handleAddFavorite = async (productId) => {
    if (!token) {
      alert('Please login to add favorites');
      return;
    }

    try {
      if (favorites.includes(productId)) {
        await favoritesService.removeFavorite(productId);
        setFavorites(favorites.filter((id) => id !== productId));
      } else {
        await favoritesService.addFavorite(productId);
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  if (loading) {
    return <div className="menu-page"><div className="loading">Loading menu...</div></div>;
  }

  return (
    <div className="menu-page">
      <div className="menu-container">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="menu-content">
          {/* Sidebar - Category Filter */}
          <aside className="sidebar">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Main Content - Products */}
          <main className="products-grid">
            <div className="results-header">
              <h2>{selectedCategory || 'All Products'}</h2>
              <p>{filteredProducts.length} products found</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="products">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddFavorite={handleAddFavorite}
                    isFavorite={favorites.includes(product._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>No products found. Try a different search or category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
