import React, { useState } from "react";
import "./cart.css";

function Cart({ open, onClose, items, setCartItems, user }) {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "cash"
  });

  if (!open) return null;

  const increaseQty = id =>
    setCartItems(items.map(i =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    ));

  const decreaseQty = id =>
    setCartItems(items.map(i =>
      i.id === id ? { ...i, qty: i.qty > 1 ? i.qty - 1 : 1 } : i
    ));

  const removeItem = id =>
    setCartItems(items.filter(i => i.id !== id));

  const total = items.reduce(
    (sum, item) =>
      sum +
      (parseFloat(item.price.replace("$", "")) || 0) * item.qty,
    0
  );

  const initializeFormWithUserData = () => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        address: "",
        phone: "",
        paymentMethod: "cash"
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleCheckout = () => {
    if (items.length === 0) return;
    
  
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    initializeFormWithUserData();
    setShowCheckoutForm(true);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();

    console.log("Order details:", {
      ...formData,
      items: items,
      total: total,
      userId: user?.id || null
    });

    setOrderSuccess(true);
    setCartItems([]);
    setShowCheckoutForm(false);

    setFormData({
      fullName: "",
      email: "",
      address: "",
      phone: "",
      paymentMethod: "cash"
    });

    setTimeout(() => {
      setOrderSuccess(false);
      onClose();
    }, 3000);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = (userData) => {
    setShowLoginModal(false);

    if (userData) {
      setFormData({
        fullName: userData.name || "",
        email: userData.email || "",
        address: "",
        phone: "",
        paymentMethod: "cash"
      });
      setShowCheckoutForm(true);
    }
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-modal" onClick={e => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Your Cart</h2>
            <span className="close" onClick={onClose}>✕</span>
          </div>

          <div className="cart-list">
            {items.length === 0 ? (
              <p style={{ textAlign: "center", margin: "40px 0" }}>
                Your cart is empty
              </p>
            ) : (
              items.map(item => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-img1">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <span className="cart-price">{item.price}</span>

                    <div className="cart-actions">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>

                  <div
                    className="cart-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && !showCheckoutForm && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                {user ? `Checkout as ${user.name}` : "Checkout"}
              </button>
              
              {!user && (
                <div className="login-prompt">
                  <small>Please login for faster checkout</small>
                </div>
              )}
            </div>
          )}


          {showCheckoutForm && (
            <div className="checkout-form">
              <h3>Checkout Information</h3>
              <form onSubmit={handleConfirmOrder}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    disabled={!!user} 
                  />
                  {user && (
                    <small className="field-note">Email from your account (can't be changed)</small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+996 XXX XXX XXX"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full address"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="card">Credit Card</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>

                <div className="checkout-form-buttons">
                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={() => setShowCheckoutForm(false)}
                  >
                    Back to Cart
                  </button>
                  <button type="submit" className="confirm-order-btn">
                    Confirm Order (${total.toFixed(2)})
                  </button>
                </div>
              </form>
            </div>
          )}

    
          {orderSuccess && (
            <div className="order-confirmed">
              ✅ Order successfully placed!
            </div>
          )}  
        </div>
      </div>

    
      {showLoginModal && (
        <Login 
          open={showLoginModal} 
          onClose={handleLoginClose}
          onLogin={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Cart;