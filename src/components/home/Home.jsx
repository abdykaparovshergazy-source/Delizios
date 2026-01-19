import React from 'react'
import './home.css'
import Block from './block1/Block'
import Block2 from './block2/Block2'
import Block3 from './block3/Block3'
import Block4 from './block4/Block4'
import Block5 from './block5/Block5'
import Block7 from './block7/Block7'
import { useOutletContext } from 'react-router-dom'

function Home({ cartItems, setCartItems }) {

  const { openCart } = useOutletContext()

  return (
    <div>
      <Block onOrderClick={openCart}/>
      <Block2 />
      <Block3 cartItems={cartItems} setCartItems={setCartItems} openCart={openCart}/>
      <Block4 />
      <Block5 />
      <Block7 onOrderClick={openCart}/>
    </div>
  )
}

export default Home
