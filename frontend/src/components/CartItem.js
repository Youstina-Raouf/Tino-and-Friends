// CartItem Component
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import '../styles/CartItem.css';

export default function CartItem({ item }) {
  const { updateCartQuantity, removeFromCart } = useApp();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p className="category">{item.category}</p>
        <span className="price">${item.price.toFixed(2)}</span>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => updateCartQuantity(item._id, item.quantity - 1)}>
          −
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateCartQuantity(item._id, item.quantity + 1)}>
          +
        </button>
      </div>

      <div className="cart-item-total">
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>

      <button
        className="remove-btn"
        onClick={() => removeFromCart(item._id)}
      >
        <FiTrash2 />
      </button>
    </div>
  );
}
