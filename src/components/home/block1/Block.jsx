import React from 'react'
import './Block.css'
import foodImg from '../../../assets/1.png'
import { useNavigate } from 'react-router-dom'

function Block({ onOrderClick }) {

    const navigate = useNavigate()

    return (
        <div className="block container">

            <div className="left-side">
                <div className="tag">Restaurant</div>

                <h1 className="text11">
                    Italian <br /> Cuisine
                </h1>

                <p className="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing <br />
                    elit. Sodales senectus dictum arcu sit tristique <br />
                    donec eget.
                </p>

                <div className="buttons">
                    <button className="order-btn" onClick={onOrderClick}> Order now </button>

                    <button className="reserve-btn" onClick={() => navigate('reservation')} > Reservation </button>
                </div>
            </div>

            <div className="right-side">
                <img src={foodImg} className="food-img" alt="food" />
            </div>

        </div>
    )
}

export default Block
