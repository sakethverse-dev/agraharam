import React, { useState } from 'react';
import { PRODUCTS_SHOWCASE, ORDER_CATEGORIES } from '../data/products';

function OrderSection({ phoneNumber = "+91 80089 44894", cart, setCart, isCartOpen, setIsCartOpen }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for product card selections: { [productId]: { selectedSizeIndex, quantity } }
  const [productSelections, setProductSelections] = useState(() => {
    const initial = {};
    PRODUCTS_SHOWCASE.forEach((p) => {
      initial[p.id] = { sizeIndex: 0, qty: 1 };
    });
    return initial;
  });

  const [addedAnimation, setAddedAnimation] = useState({});

  const rawPhone = phoneNumber.replace(/[^0-9]/g, '');

  const filteredProducts = PRODUCTS_SHOWCASE.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    if (!searchQuery.trim()) return matchesCategory;
    
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      (p.telugu && p.telugu.toLowerCase().includes(q)) ||
      (p.highlight && p.highlight.toLowerCase().includes(q)) ||
      (p.desc && p.desc.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.leftCallout && p.leftCallout.toLowerCase().includes(q)) ||
      (p.rightCallout && p.rightCallout.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleSizeChange = (productId, sizeIndex) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        sizeIndex
      }
    }));
  };

  const handleQtyChange = (productId, delta) => {
    setProductSelections((prev) => {
      const currentQty = prev[productId]?.qty || 1;
      const newQty = Math.max(1, Math.min(20, currentQty + delta));
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          qty: newQty
        }
      };
    });
  };

  const handleAddToCart = (product) => {
    const selection = productSelections[product.id] || { sizeIndex: 0, qty: 1 };
    const variant = product.variants[selection.sizeIndex];
    const cartItemId = `${product.id}-${variant.size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + selection.qty
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            telugu: product.telugu,
            img: product.img,
            size: variant.size,
            price: variant.price,
            quantity: selection.qty
          }
        ];
      }
    });

    // Visual feedback on button
    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="order" className="order-section">
      <div className="order-section-container">
        {/* Section Header */}
        <div className="order-header">
          <div className="order-ornament">
            <span className="order-ornament-gem">❖</span>
          </div>
          <span className="order-subtitle">FRESH HANDCRAFTED KITCHEN</span>
          <h2 className="order-title">Select Delicacies & Order Online</h2>
          <p className="order-description">
            Choose your favorite homemade savories, sweets, and pickles. Select your desired pack size, add to cart, and send your order directly via WhatsApp or phone.
          </p>
        </div>

        {/* Search Bar */}
        <div className="order-search-wrapper">
          <div className="order-search-box">
            <span className="search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="order-search-input"
              placeholder="Search delicacies (e.g. Ragi Papad, Moringa Powder, Mango Pickle, మునగాకు...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search delicacies and products"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery.trim() && (
            <div className="search-status-bar">
              <span>
                Found <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'delicacy' : 'delicacies'} matching "<em>{searchQuery}</em>"
              </span>
              <button
                type="button"
                className="search-reset-link"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="order-categories-strip">
          {ORDER_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.id}
              className={`category-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="order-empty-search-state">
            <div className="empty-search-icon">❖</div>
            <h3 className="empty-search-title">No Delicacies Found</h3>
            <p className="empty-search-text">
              We couldn't find any items matching "<strong>{searchQuery}</strong>"{activeCategory !== 'all' ? ` in this category` : ''}.
            </p>
            <button
              type="button"
              className="empty-search-reset-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              View All 21 Delicacies
            </button>
          </div>
        ) : (
          <div className="order-products-grid">
          {filteredProducts.map((product) => {
            const selection = productSelections[product.id] || { sizeIndex: 0, qty: 1 };
            const currentVariant = product.variants[selection.sizeIndex];
            const isAdded = addedAnimation[product.id];
            const lowestPrice = product.variants[0]?.price;

            return (
              <div key={product.id} className="order-product-card">
                {/* Product Thumbnail with Quick Add button */}
                <div className="product-card-media">
                  <img src={product.img} alt={product.name} className="product-card-img" loading="lazy" />
                  <button
                    type="button"
                    className="quick-add-btn"
                    onClick={() => handleAddToCart(product)}
                    title={`Quick add ${product.name} to cart`}
                    aria-label={`Quick add ${product.name} to cart`}
                  >
                    {isAdded ? '✓' : '+'}
                  </button>
                </div>

                {/* Content */}
                <div className="product-card-body">
                  <div className="product-card-info-top">
                    <span className="product-telugu-badge">{product.telugu}</span>
                    <h3 className="product-card-name" title={product.name}>{product.name}</h3>
                  </div>

                  {/* Price Line */}
                  <div className="product-price-line">
                    <span className="from-prefix">from</span>
                    <span className="product-price-val">₹{lowestPrice}</span>
                    {selection.sizeIndex > 0 && (
                      <span className="selected-size-price">({currentVariant.size}: ₹{currentVariant.price})</span>
                    )}
                  </div>

                  {/* Pack Size Selector Dropdown */}
                  <div className="pack-select-container">
                    <select
                      value={selection.sizeIndex}
                      onChange={(e) => handleSizeChange(product.id, Number(e.target.value))}
                      className="pack-select-dropdown"
                      aria-label={`Select pack size for ${product.name}`}
                    >
                      {product.variants.map((variant, vIdx) => (
                        <option key={variant.size} value={vIdx}>
                          {variant.size} – ₹{variant.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stepper & Add to Cart Action Row */}
                  <div className="product-card-actions">
                    <div className="qty-stepper">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => handleQtyChange(product.id, -1)}
                        disabled={selection.qty <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{selection.qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => handleQtyChange(product.id, 1)}
                        disabled={selection.qty >= 20}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className={`add-cart-btn ${isAdded ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {isAdded ? (
                        <>
                          <span>Added!</span>
                          <span className="btn-icon">✓</span>
                        </>
                      ) : (
                        <>
                          <span>Add</span>
                          <span className="btn-icon">+</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Bottom Banner to Contact / Bulk Inquiries */}
        <div className="order-bottom-assistance-card">
          <div className="assistance-info">
            <div className="assistance-icon">❖</div>
            <div>
              <h4 className="assistance-title">Looking for Bulk / Event Catering or Custom Hampers?</h4>
              <p className="assistance-desc">
                We accept special festival hamper orders, wedding distributions, and bulk sweet & savory catering with customized wholesale pricing.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(
              'Hello AGRAHARAM, I am inquiring about Bulk / Event Catering orders.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="assistance-cta-btn"
          >
            Inquire for Bulk Orders →
          </a>
        </div>
      </div>
    </section>
  );
}

export default OrderSection;
