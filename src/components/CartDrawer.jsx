import React, { useState } from 'react';

function CartDrawer({ isOpen, onClose, cart, setCart, phoneNumber = "+91 80089 44894" }) {
  const [orderType, setOrderType] = useState('normal');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    eventDate: '',
    notes: '',
    website_hp: '' // Honeypot bot trap
  });

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationFeedback, setLocationFeedback] = useState({ type: '', message: '' });
  const [gpsCoords, setGpsCoords] = useState(null); // { lat, lon, mapsUrl }

  const rawPhone = phoneNumber.replace(/[^0-9]/g, '');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sanitizeInput = (text) => {
    if (!text) return '';
    return text.replace(/[<>]/g, '').trim();
  };

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
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError('');
    if (name === 'address' && locationFeedback.type === 'error') {
      setLocationFeedback({ type: '', message: '' });
    }
  };

  // Auto-detect GPS Location and reverse geocode
  const handleAutoDetectLocation = async () => {
    if (isLocating) return;
    setLocationFeedback({ type: '', message: '' });

    if (!navigator.geolocation) {
      setLocationFeedback({
        type: 'error',
        message: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        setGpsCoords({ lat: latitude, lon: longitude, mapsUrl });

        try {
          let formattedAddress = '';

          // 1. Try BigDataCloud reverse geocoding API (Fast, CORS friendly, detailed Indian admin divisions)
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (res.ok) {
              const data = await res.json();
              const parts = [];
              if (data.locality) parts.push(data.locality);
              if (data.city && data.city !== data.locality) parts.push(data.city);
              if (data.principalSubdivision) parts.push(data.principalSubdivision);
              if (data.postcode) parts.push(data.postcode);

              if (parts.length > 0) {
                formattedAddress = parts.join(', ');
              }
            }
          } catch (err) {
            console.warn('BigDataCloud geocode failed, falling back to Nominatim:', err);
          }

          // 2. Fallback to OpenStreetMap Nominatim
          if (!formattedAddress) {
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
              );
              if (res.ok) {
                const data = await res.json();
                if (data && data.address) {
                  const addr = data.address;
                  const road = addr.road || addr.suburb || addr.neighbourhood || '';
                  const city = addr.city || addr.town || addr.village || addr.county || '';
                  const state = addr.state || '';
                  const postcode = addr.postcode || '';

                  const parts = [road, city, state, postcode].filter(Boolean);
                  if (parts.length > 0) {
                    formattedAddress = parts.join(', ');
                  } else if (data.display_name) {
                    formattedAddress = data.display_name.split(',').slice(0, 4).join(',').trim();
                  }
                }
              }
            } catch (err) {
              console.warn('Nominatim geocode fallback failed:', err);
            }
          }

          if (formattedAddress) {
            setCustomerData((prev) => ({
              ...prev,
              address: formattedAddress
            }));
            setLocationFeedback({
              type: 'success',
              message: 'Location auto-filled! You can add Flat / Door No. if needed.'
            });
          } else {
            const coordsStr = `GPS Pin (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
            setCustomerData((prev) => ({
              ...prev,
              address: prev.address ? `${prev.address} [${coordsStr}]` : coordsStr
            }));
            setLocationFeedback({
              type: 'success',
              message: 'GPS coordinates detected! Please verify your area / city.'
            });
          }
        } catch (err) {
          console.error('Error in reverse geocode process:', err);
          setLocationFeedback({
            type: 'error',
            message: 'Unable to resolve address name. Please enter manually.'
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        let errorMsg = 'Could not fetch your location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location access was denied in your browser. Please type your area manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location position unavailable. Please type manually.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timed out. Please try again or type manually.';
        }
        setLocationFeedback({
          type: 'error',
          message: errorMsg
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenConfirmation = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Honeypot check: If bot filled the hidden honeypot, ignore silently
    if (customerData.website_hp) {
      return;
    }

    const cleanName = sanitizeInput(customerData.name);
    const cleanPhone = sanitizeInput(customerData.phone);
    const cleanAddress = sanitizeInput(customerData.address);

    if (!cleanName || !cleanPhone || !cleanAddress) {
      setFormError('Please fill in your Name, Phone Number, and Delivery City/Area.');
      return;
    }

    // Phone validation (digits only count should be at least 10)
    const digitCount = cleanPhone.replace(/[^0-9]/g, '').length;
    if (digitCount < 10) {
      setFormError('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    setFormError('');
    setShowConfirmModal(true);
  };

  const confirmAndSendWhatsApp = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowConfirmModal(false);

    const cleanName = sanitizeInput(customerData.name);
    const cleanPhone = sanitizeInput(customerData.phone);
    const cleanAddress = sanitizeInput(customerData.address);
    const cleanDate = sanitizeInput(customerData.eventDate);
    const cleanNotes = sanitizeInput(customerData.notes);

    const typeLabel = orderType === 'bulk' ? 'BULK / EVENT ORDER' : 'NORMAL / HOUSEHOLD ORDER';
    
    // Format item list
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (${item.size})\n   - Quantity: ${item.quantity}\n   - Subtotal: ₹${item.price * item.quantity}`
      )
      .join('\n');

    const message =
      `*NEW ORDER FROM WEBSITE - AGRAHARAM*\n\n` +
      `*Order Type:* ${typeLabel}\n` +
      `*Customer Name:* ${cleanName}\n` +
      `*Phone Number:* ${cleanPhone}\n` +
      `*Delivery Location / City:* ${cleanAddress}\n` +
      (gpsCoords?.mapsUrl ? `*Google Maps Pin:* ${gpsCoords.mapsUrl}\n` : '') +
      (orderType === 'bulk' && cleanDate ? `*Required Date / Event:* ${cleanDate}\n` : '') +
      (cleanNotes ? `*Special Notes:* ${cleanNotes}\n` : '') +
      `\n*ORDERED DELICACIES:*\n${itemsList}\n\n` +
      `*SUBTOTAL AMOUNT:* ₹${subtotal}\n` +
      `*DELIVERY CHARGES:* Applicable based on location\n\n` +
      `_Sent via AGRAHARAM Online Store_`;

    const url = `https://wa.me/${rawPhone || '918008944894'}?text=${encodeURIComponent(message)}`;
    
    // Reverse tabnabbing protection with explicit noopener,noreferrer
    window.open(url, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
          {/* Drawer Header */}
          <div className="cart-drawer-header">
            <div className="cart-header-left">
              <span className="cart-header-icon">❖</span>
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
                <div className="empty-cart-icon">❖</div>
                <h4 className="empty-cart-title">Your cart is currently empty</h4>
                <p className="empty-cart-desc">
                  Explore our authentic traditional homemade snacks, sweets, and pickles to start your order.
                </p>
                <button
                  type="button"
                  className="empty-cart-cta"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('menu') || document.getElementById('order');
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
                        ✕
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
                    <span>Normal Order</span>
                  </button>
                  <button
                    type="button"
                    className={`order-type-tab ${orderType === 'bulk' ? 'active' : ''}`}
                    onClick={() => setOrderType('bulk')}
                  >
                    <span>Bulk / Event Order</span>
                  </button>
                </div>

                {/* Customer Details Form */}
                <form id="cart-checkout-form" onSubmit={handleOpenConfirmation} className="cart-customer-form">
                  <div className="form-subheading">Delivery & Customer Details</div>

                  {formError && (
                    <div style={{
                      background: '#FFF3F3',
                      border: '1px solid #E57373',
                      color: '#C62828',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      marginBottom: '16px'
                    }}>
                      • {formError}
                    </div>
                  )}

                  {/* Honeypot Spam Trap (Hidden from real users) */}
                  <input
                    type="text"
                    name="website_hp"
                    value={customerData.website_hp}
                    onChange={handleInputChange}
                    tabIndex="-1"
                    autoComplete="off"
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
                    aria-hidden="true"
                  />

                  <div className="cart-form-group">
                    <label htmlFor="cart-name" className="cart-label">Your Name *</label>
                    <input
                      type="text"
                      id="cart-name"
                      name="name"
                      maxLength={80}
                      value={customerData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="cart-input"
                      required
                    />
                  </div>

                  <div className="cart-form-group">
                    <label htmlFor="cart-phone" className="cart-label">Phone Number *</label>
                    <input
                      type="tel"
                      id="cart-phone"
                      name="phone"
                      maxLength={15}
                      value={customerData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 98480 12345"
                      className="cart-input"
                      required
                    />
                  </div>

                  <div className="cart-form-group">
                    <div className="cart-label-row">
                      <label htmlFor="cart-address" className="cart-label">Delivery City / Area *</label>
                      <button
                        type="button"
                        className={`auto-loc-btn ${isLocating ? 'loading' : ''} ${locationFeedback.type === 'success' ? 'success' : ''}`}
                        onClick={handleAutoDetectLocation}
                        disabled={isLocating}
                        title="Auto-fill your current delivery location using GPS"
                      >
                        {isLocating ? (
                          <>
                            <span className="loc-spinner"></span>
                            <span>Detecting...</span>
                          </>
                        ) : locationFeedback.type === 'success' ? (
                          <>
                            <span className="loc-icon">✓</span>
                            <span>Location Filled</span>
                          </>
                        ) : (
                          <>
                            <svg className="loc-svg-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>Auto-Fill Location</span>
                          </>
                        )}
                      </button>
                    </div>
                    <input
                      type="text"
                      id="cart-address"
                      name="address"
                      maxLength={250}
                      value={customerData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Jubilee Hills, Hyderabad (or click Auto-Fill)"
                      className="cart-input"
                      required
                    />
                    {locationFeedback.message && (
                      <div className={`loc-feedback-msg ${locationFeedback.type}`}>
                        {locationFeedback.type === 'success' ? '✓ ' : '• '}
                        {locationFeedback.message}
                      </div>
                    )}
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
                      maxLength={400}
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

              {/* Delivery Charges Notice */}
              <div className="cart-delivery-notice">
                <span className="delivery-notice-icon">❖</span>
                <span className="delivery-notice-text">
                  Delivery charges are applicable based on location & order weight.
                </span>
              </div>

              <div className="cart-total-row">
                <span className="total-label">Estimated Subtotal:</span>
                <div className="total-amount-wrap">
                  <span className="total-amount">₹{subtotal}</span>
                  <span className="total-extra-tag">+ Delivery</span>
                </div>
              </div>

              <button
                type="submit"
                form="cart-checkout-form"
                className="cart-checkout-btn"
              >
                <span>Proceed to WhatsApp Order</span>
                <span className="btn-icon">→</span>
              </button>

              <a
                href={`tel:${rawPhone || '918008944894'}`}
                className="cart-call-order-link"
              >
                Call Directly to Order: {phoneNumber}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Order Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-backdrop" onClick={() => setShowConfirmModal(false)}>
          <div className="confirmation-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-ornament">❖</div>
              <h3 className="confirm-modal-title">Confirm WhatsApp Order</h3>
              <p className="confirm-modal-subtitle">
                Please review your order details before redirecting to WhatsApp.
              </p>
            </div>

            <div className="confirm-modal-body">
              <div className="confirm-detail-row">
                <span className="confirm-detail-label">Customer:</span>
                <strong className="confirm-detail-val">{customerData.name} ({customerData.phone})</strong>
              </div>
              <div className="confirm-detail-row">
                <span className="confirm-detail-label">Delivery To:</span>
                <strong className="confirm-detail-val">
                  {customerData.address}
                  {gpsCoords?.mapsUrl && <span className="gps-tag"> (GPS Pin Attached)</span>}
                </strong>
              </div>
              <div className="confirm-detail-row">
                <span className="confirm-detail-label">Total Items:</span>
                <strong className="confirm-detail-val">{totalItems} ({orderType === 'bulk' ? 'Bulk Order' : 'Normal Order'})</strong>
              </div>
              <div className="confirm-detail-row highlight-row">
                <span className="confirm-detail-label">Subtotal:</span>
                <strong className="confirm-detail-val">₹{subtotal}</strong>
              </div>
              <div className="confirm-delivery-alert">
                <span className="alert-icon">❖</span>
                <span><strong>Note:</strong> Delivery charges are applicable based on delivery distance.</span>
              </div>
            </div>

            <div className="confirm-modal-actions">
              <button
                type="button"
                className="confirm-cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                Edit Details
              </button>
              <button
                type="button"
                className="confirm-proceed-btn"
                onClick={confirmAndSendWhatsApp}
              >
                <span>Confirm & Send on WhatsApp</span>
                <span className="confirm-btn-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartDrawer;
