import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft, FiHeart } from 'react-icons/fi';
import { productService, favoritesService } from '../services/api';
import { useApp } from '../context/AppContext';
import '../styles/pages/ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, user } = useApp();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await productService.getProduct(id);
                setProduct(data.data);

                // If user is logged in, check if it's a favorite
                if (user) {
                    const favs = await favoritesService.getFavorites();
                    setIsFavorite(favs.data.data.some(f => f._id === id));
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, user]);

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    const toggleFavorite = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            if (isFavorite) {
                await favoritesService.removeFavorite(id);
            } else {
                await favoritesService.addFavorite(id);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    if (loading) return (
        <div className="product-details-loading">
            <div className="loader"></div>
            <p>Gathering Artisanal Details...</p>
        </div>
    );

    if (!product) return (
        <div className="product-details-error">
            <h2>Product Not Found</h2>
            <Link to="/menu" className="back-link">Return to Menu</Link>
        </div>
    );

    return (
        <div className="product-details-page">
            <div className="container">
                <Link to="/menu" className="back-btn">
                    <FiArrowLeft /> Back to Menu
                </Link>

                <div className="product-details-grid">
                    <div className="product-image-section">
                        <img src={product.image} alt={product.name} />
                        <button className={`details-favorite-btn ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
                            <FiHeart />
                        </button>
                    </div>

                    <div className="product-info-section">
                        <span className="details-category">{product.category}</span>
                        <h1>{product.name}</h1>
                        <div className="details-rating">
                            <span>⭐ {product.rating || 4.5}</span>
                            <span className="reviews-count">(Artisan Approved)</span>
                        </div>

                        <p className="details-price">{product.price.toFixed(2)} EGP</p>

                        <div className="details-description">
                            <h3>Overview</h3>
                            <p>{product.description}</p>
                        </div>

                        {(product.ingredients?.length > 0) && (
                            <div className="details-metadata">
                                <h3>Ingredients</h3>
                                <ul>
                                    {product.ingredients.map((ing, idx) => (
                                        <li key={idx}>{ing}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {(product.allergens?.length > 0) && (
                            <div className="details-metadata allergens">
                                <h3>Allergens</h3>
                                <p>{product.allergens.join(', ')}</p>
                            </div>
                        )}

                        <div className="details-actions">
                            <button className="details-add-to-cart" onClick={handleAddToCart}>
                                <FiShoppingCart /> Add to Basket
                            </button>
                            <p className="stock-info">
                                {product.stockQuantity > 0
                                    ? `In Stock (${product.stockQuantity} available)`
                                    : 'Restocking Soon'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
