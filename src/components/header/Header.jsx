import "./header.css";
import surot from '../../assets/карзина.png';
import { Link } from 'react-router-dom';
import { useState } from "react";
import Login from "../login/Login";


function Header({ cartItems, setCartItems, user, onLogout, onLogin, openCart }) {
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className='header container'>
        <div className="logo">
          <div className="circle">D</div>
          <h2>Delizi <span>oso</span></h2>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className={mobileMenuOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="menu" onClick={closeMobileMenu}>Menu</Link></li>
          <li><Link to="about" onClick={closeMobileMenu}>About us</Link></li>
          <li><Link to="reservation" onClick={closeMobileMenu}>Reservation</Link></li>
          <li><Link to="contact" onClick={closeMobileMenu}>Contact us</Link></li>
        </ul>

        <div className="right-block">
          <div className="cart-box" onClick={openCart}>
            <img src={surot} className="cart-img" alt="Cart" />
            <span className="badge">{totalQty}</span>
          </div>

          {user ? (
            <div
              className="user-profile-header"
              onClick={() => setProfileOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="user-avatar-header"
              />
              <span className="user-name-header">{user.name}</span>
            </div>
          ) : (
            <button className="login-btn" onClick={onLogin}>
              Log in
            </button>
          )}

        </div>
      </div>

      <Login
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onLogin={onLogin}
        onLogout={onLogout}
      />

    </>
  );
}

export default Header;