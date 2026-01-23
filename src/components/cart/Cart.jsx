import React, { useState } from "react";
import "./cart.css";

function Cart({ open, onClose, items, setCartItems }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const phoneNumber = "996552411160"; 

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    const message = encodeURIComponent(`
    *New Order*
    -----------------------
    Name: ${formData.fullName}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Address: ${formData.address}

    Items:
    ${items.map(i => `${i.title} x${i.qty} - ${i.price}\nImage: ${i.image}`).join("\n")}

    -----------------------
    Total: $${total.toFixed(2)}
  `);

    const whatsappUrl = `https://api.whatsapp.com/send?phone=996552411160&text=${message}`;
    window.open(whatsappUrl, "_blank");

    setCartItems([]);
    onClose();
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

                  <div className="cart-remove" onClick={() => removeItem(item.id)}>
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

              <button
                className="checkout-btn"
                onClick={() => setShowCheckoutForm(true)}
              >
                Checkout
              </button>
            </div>
          )}

          {showCheckoutForm && (
            <div className="checkout-form">
              <h3>Checkout Information</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+996 XXX XXX XXX"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Your address"
                  required
                />
              </div>

              <div className="checkout-form-buttons">
                <button className="back-btn" onClick={() => setShowCheckoutForm(false)}>
                  Back to Cart
                </button>
                <button className="confirm-order-btn" onClick={handleSendWhatsApp}>
                  Send via WhatsApp
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Cart;
