import React, { useRef } from 'react';
import '../styles/HoverRevealCards.css';

/**
 * A component that displays a grid of cards with a hover-reveal effect.
 * When a card is hovered, it stands out while others are de-emphasized.
 */
export default function HoverRevealCards({ items = [], className = '', cardClassName = '' }) {
  const containerRef = useRef(null);

  const handleCardHover = (e) => {
    const container = containerRef.current;
    if (!container) return;

    if (e.type === 'mouseenter' || e.type === 'focus') {
      // Add hover state to container
      container.setAttribute('data-hovering', 'true');
      // Mark which card is being hovered
      e.currentTarget.setAttribute('data-is-hovered', 'true');
    }
  };

  const handleCardLeave = (e) => {
    const container = containerRef.current;
    if (!container) return;

    if (e.type === 'mouseleave' || e.type === 'blur') {
      // Remove hover state
      container.removeAttribute('data-hovering');
      e.currentTarget.removeAttribute('data-is-hovered');
    }
  };

  return (
    <div
      ref={containerRef}
      role="list"
      className={`hover-reveal-cards-container ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          aria-label={`${item.title}, ${item.subtitle}`}
          tabIndex={0}
          className={`hover-reveal-card ${cardClassName}`}
          style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : { backgroundColor: 'var(--accent-color)' }}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
          onFocus={handleCardHover}
          onBlur={handleCardLeave}
        >
          {/* Gradient overlay for text contrast */}
          <div className="hover-reveal-overlay" />

          {/* Card Content */}
          <div className="hover-reveal-content">
            {item.icon && <div className="hover-reveal-icon">{item.icon}</div>}
            <p className="hover-reveal-subtitle">{item.subtitle}</p>
            <h3 className="hover-reveal-title">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
