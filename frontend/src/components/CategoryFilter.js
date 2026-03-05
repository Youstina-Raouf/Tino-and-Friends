// CategoryFilter Component
import React from 'react';
import '../styles/CategoryFilter.css';

const CATEGORIES = ['Pastries', 'Sandwiches', 'Bread', 'Beverages', 'Viennoiserie'];

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-buttons">
        <button
          className={selectedCategory === '' ? 'active' : ''}
          onClick={() => onCategoryChange('')}
        >
          All Products
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
