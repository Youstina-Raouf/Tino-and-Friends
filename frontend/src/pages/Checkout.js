// Checkout Page with Stripe
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { orderService } from '../services/api';
import { useApp } from '../context/AppContext';
import '../styles/pages/Checkout.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderCreated, setOrderCreated] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, token } = useApp();

  if (!token) {
    return (
      <div className="checkout-page">
        <div className="not-logged-in">
          <h2>Please log in to checkout</h2>
          <Link to="/login" className="login-link">
            Login Here
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/menu" className="continue-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create order first
      const orderResponse = await orderService.createOrder(
        cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        formData
      );

      // Create Stripe session
      const sessionResponse = await orderService.createCheckoutSession(
        cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        formData
      );

      // Redirect to Stripe checkout
      if (sessionResponse.data.url) {
        window.location.href = sessionResponse.data.url;
      } else {
        setError('Failed to create payment session');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          {/* Checkout Form */}
          <div className="checkout-form-section">
            <h2>Shipping Address</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <h2 style={{ marginTop: '2rem' }}>Payment Information</h2>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                You will be redirected to Stripe to complete your payment securely.
              </p>

              <button type="submit" className="submit-btn" disabled={loading || !stripe}>
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item._id} className="summary-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Shipping:</span>
              <span>$5.00</span>
            </div>

            <div className="summary-total">
              <span>Tax:</span>
              <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total final">
              <span>Total:</span>
              <span>${(getCartTotal() + 5 + getCartTotal() * 0.08).toFixed(2)}</span>
            </div>

            <Link to="/cart" className="back-to-cart">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
