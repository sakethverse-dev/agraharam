import React, { useState } from 'react';

function CartDrawer({ isOpen, onClose, cart, setCart, phoneNumber = "+91 80089 44894" }) {
  const [orderType, setOrderType] = useState('normal');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    eventDate: '',
    notes: ''
  });

  const rawPhone = phoneNumber.replace(/[^0-9]/g, '');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQtyUpdate = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleInputChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckoutWhatsApp = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const typeLabel = orderType === 'bulk' ? 'BULK / EVENT ORDER' : 'NORMAL / HOUSEHOLD ORDER';
    
    // Format item list
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (${item.size})\n   - Quantity: ${item.quantity}\n   - Subtotal: ₹${item.price * item.quantity}`
      )
      .join('\n');

    const message =
      `🌿 *NEW ORDER FROM WEBSITE - AGRAHARAM* 🌿\n\n` +
      `*Order Type:* ${typeLabel}\n` +
      `*Customer Name:* ${customerData.name || 'Not provided'}\n` +
      `*Phone Number:* ${customerData.phone || 'Not provided'}\n` +
      `*Delivery Location / City:* ${customerData.address || 'Not provided'}\n` +
      (orderType === 'bulk' && customerData.eventDate ? `*Required Date / Event:* ${customerData.eventDate}\n` : '') +
      (customerData.notes ? `*Special Notes:* ${customerData.notes}\n` : '') +
      `\n🛒 *ORDERED DELICACIES:*\n${itemsList}\n\n` +
      `💰 *TOTAL ESTIMATED AMOUNT:* ₹${subtotal}\n` +
      `✨ *Quality Promise:* Pure Desi Cow Ghee & Wood-Pressed Oils\n\n` +
      `_Sent via AGRAHARAM Online Store_`;

    const url = `https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-left">
            <span className="cart-header-icon">🛍️</span>
            <div>
              <h3 className="cart-header-title">Your Order Cart</h3>
              <span className="cart-header-count">{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</span>
            </div>
          </div>
          <button type="button" className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">🛒</div>
              <h4 className="empty-cart-title">Your cart is currently empty</h4>
              <p className="empty-cart-desc">
                Explore our authentic traditional homemade snacks, sweets, and pickles to start your order.
              </p>
              <button
                type="button"
                className="empty-cart-cta"
                onClick={() => {
                  onClose();
                  const el = document.getElementById('order');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Menu & Delicacies
              </button>
            </div>
          ) : (
            <>
              {/* Itemized Cart List */}
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="cart-item-row">
                    <img src={item.img} alt={item.name} className="cart-item-thumb" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <div className="cart-item-meta">
                        <span className="cart-item-size">{item.size}</span>
                        <span className="cart-item-rate">@ ₹{item.price} each</span>
                      </div>
                      <div className="cart-item-controls">
                        <div className="cart-qty-stepper">
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => handleQtyUpdate(item.cartItemId, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="cart-qty-num">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => handleQtyUpdate(item.cartItemId, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item-total">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cart-item-delete"
                      onClick={() => handleRemoveItem(item.cartItemId)}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Mode Toggle */}
              <div className="cart-order-type-selector">
                <button
                  type="button"
                  className={`order-type-tab ${orderType === 'normal' ? 'active' : ''}`}
                  onClick={() => setOrderType('normal')}
                >
                  <span>🏠 Normal Order</span>
                </button>
                <button
                  type="button"
                  className={`order-type-tab ${orderType === 'bulk' ? 'active' : ''}`}
                  onClick={() => setOrderType('bulk')}
                >
                  <span>🎉 Bulk / Event Order</span>
                </button>
              </div>

              {/* Customer Details Form */}
              <form id="cart-checkout-form" onSubmit={handleCheckoutWhatsApp} className="cart-customer-form">
                <div className="form-subheading">Delivery & Customer Details</div>

                <div className="cart-form-group">
                  <label htmlFor="cart-name" className="cart-label">Your Name</label>
                  <input
                    type="text"
                    id="cart-name"
                    name="name"
                    value={customerData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sridhar Rao"
                    className="cart-input"
                    required
                  />
                </div>

                <div className="cart-form-group">
                  <label htmlFor="cart-phone" className="cart-label">Phone Number</label>
                  <input
                    type="tel"
                    id="cart-phone"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 98480 12345"
                    className="cart-input"
                    required
                  />
                </div>

                <div className="cart-form-group">
                  <label htmlFor="cart-address" className="cart-label">Delivery City / Area</label>
                  <input
                    type="text"
                    id="cart-address"
                    name="address"
                    value={customerData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. Jubilee Hills, Hyderabad"
                    className="cart-input"
                    required
                  />
                </div>

                {orderType === 'bulk' && (
                  <div className="cart-form-group">
                    <label htmlFor="cart-eventDate" className="cart-label">Event / Required Date</label>
                    <input
                      type="date"
                      id="cart-eventDate"
                      name="eventDate"
                      value={customerData.eventDate}
                      onChange={handleInputChange}
                      className="cart-input"
                    />
                  </div>
                )}

                <div className="cart-form-group">
                  <label htmlFor="cart-notes" className="cart-label">Special Notes / Spice Level (Optional)</label>
                  <input
                    type="text"
                    id="cart-notes"
                    name="notes"
                    value={customerData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Medium spicy, festive gift pack..."
                    className="cart-input"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout CTA) */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span className="summary-label">Delicacies Subtotal:</span>
              <span className="summary-value">₹{subtotal}</span>
            </div>
            <div className="cart-summary-row highlight">
              <span className="summary-label">Fresh Batch Preparation:</span>
              <span className="summary-badge">Pure Ghee & Wood-Pressed</span>
            </div>
            <div className="cart-total-row">
              <span className="total-label">Total Payable:</span>
              <span className="total-amount">₹{subtotal}</span>
            </div>

            <button
              type="submit"
              form="cart-checkout-form"
              className="cart-checkout-btn"
            >
              <span>Place Order via WhatsApp</span>
              <span className="btn-icon">📲</span>
            </button>

            <a
              href={`tel:${rawPhone || '918008944894'}`}
              className="cart-call-order-link"
            >
              📞 Call Directly to Order: {phoneNumber}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
