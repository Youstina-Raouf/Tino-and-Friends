// Cart Page
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useApp } from '../context/AppContext';
import '../styles/pages/Cart.css';

export default function Cart() {
  const { cart, getCartTotal, clearCart } = useApp();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart!</p>
          <Link to="/menu" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>$5.00</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total:</span>
                <span>${(getCartTotal() + 5 + getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <button onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </button>

            <Link to="/menu" className="continue-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
