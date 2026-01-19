import React from 'react'
import './menu.css'
import Menu1 from './menu1/Menu1'

function Menu({cartItems, setCartItems}) {
  return (
    <div>
      <Menu1 cartItems={cartItems} setCartItems={setCartItems}/>
    </div>
  )
}

export default Menu
