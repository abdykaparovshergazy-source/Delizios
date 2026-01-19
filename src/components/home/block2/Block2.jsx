import React from 'react'
import './block2.css'
import saladImg from '../../../assets/2.png'  
import { useNavigate } from 'react-router-dom'

function Block2() {

     const navigate = useNavigate()

    return (
        <div className="block2 container">

            <div className="left2">
                <img src={saladImg} alt="salad" className="food2" />
            </div>

            <div className="right2">
                <h1 className="title2">
                    Welcome to <br />
                    <span className="highlight2">delizioso</span>
                </h1>

                <p className="desc2">
                    Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
                    Facilisis ultricies at eleifend <br /> proin. Congue nibh nulla
                    malesuada <br /> ultricies nec quam.
                </p>

                <button className="menu-btn2"onClick={() => navigate("menu")}  >See our menu</button>
            </div>

        </div>
    )
}

export default Block2
