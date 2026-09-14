import React, { useState } from 'react';
import { PRODUCTS_SHOWCASE, ORDER_CATEGORIES } from '../data/products';

function OrderSection({ phoneNumber = "+91 80089 44894", cart, setCart, isCartOpen, setIsCartOpen }) {
  const [activeCategory, setActiveCategory] = useState('all');
  
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

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_SHOWCASE
    : PRODUCTS_SHOWCASE.filter((p) => p.category === activeCategory);

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

        {/* Products Grid */}
        <div className="order-products-grid">
          {filteredProducts.map((product) => {
            const selection = productSelections[product.id] || { sizeIndex: 0, qty: 1 };
            const currentVariant = product.variants[selection.sizeIndex];
            const isAdded = addedAnimation[product.id];

            return (
              <div key={product.id} className="order-product-card">
                {/* Product Thumbnail */}
                <div className="product-card-media">
                  <img src={product.img} alt={product.name} className="product-card-img" />
                </div>

                {/* Content */}
                <div className="product-card-body">
                  <span className="product-telugu-badge">{product.telugu}</span>
                  <h3 className="product-card-name">{product.name}</h3>

                  {/* Pack Size Selector */}
                  <div className="pack-size-selector-wrap">
                    <span className="selector-label">Select Pack Size:</span>
                    <div className="pack-size-pills">
                      {product.variants.map((variant, vIdx) => (
                        <button
                          type="button"
                          key={variant.size}
                          className={`pack-pill ${selection.sizeIndex === vIdx ? 'active' : ''}`}
                          onClick={() => handleSizeChange(product.id, vIdx)}
                        >
                          <span className="pill-size">{variant.size}</span>
                          <span className="pill-price">₹{variant.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Quantity & Add to Cart Row */}
                  <div className="product-card-footer">
                    <div className="price-display-block">
                      <span className="price-amount">₹{currentVariant.price * selection.qty}</span>
                      <span className="price-subtext">
                        ({selection.qty} × {currentVariant.size} @ ₹{currentVariant.price})
                      </span>
                    </div>

                    <div className="action-row">
                      {/* Stepper */}
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

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        className={`add-cart-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {isAdded ? (
                          <>
                            <span>Added!</span>
                            <span className="btn-icon">✓</span>
                          </>
                        ) : (
                          <>
                            <span>Add to Cart</span>
                            <span className="btn-icon">🛒</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to Contact / Bulk Inquiries */}
        <div className="order-bottom-assistance-card">
          <div className="assistance-info">
            <div className="assistance-icon">📦</div>
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
            Inquire for Bulk Orders 📲
          </a>
        </div>
      </div>
    </section>
  );
}

export default OrderSection;
