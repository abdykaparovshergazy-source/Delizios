import React, { useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import Cart from '../cart/Cart'
import Login from '../login/Login'
import './Layout.css'

function Layout({ cartItems, setCartItems, user, onLogin, onLogout }) {

  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  // Карзинадагы логин функциясы
  const handleCartLogin = () => {
    setCartOpen(false)
    setLoginOpen(true)
  }

  // Логин ийгиликтүү болгондо
  const handleLoginSuccess = (userData) => {
    setLoginOpen(false)
    if (onLogin) {
      onLogin(userData)
    }
  }

  return (
    <div className="layout-wrapper">
      <Header
        cartItems={cartItems}
        setCartItems={setCartItems}
        user={user}
        onLogout={onLogout}
        onLogin={() => setLoginOpen(true)}
        openCart={() => setCartOpen(true)}
      />

      <Outlet context={{
        openCart: () => setCartOpen(true),
        user: user,
        onLogin: () => setLoginOpen(true)
      }} />

      <Footer />

      {/* Cart модалы */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        setCartItems={setCartItems}
        user={user}
        onLogin={handleCartLogin}
      />

      {/* Login модалы */}
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLoginSuccess}
        onLogout={onLogout}   // 👈 МААНИЛҮҮ
      />
    </div>
  )
}

export default Layout