import React from 'react'
import "./block7.css"
import bgImage from '../../../assets/133.png'   
import { useNavigate } from 'react-router-dom'

function Block7({ onOrderClick }) {

    const navigate = useNavigate()

    return (
        <div className='block7 container'>

            <div className="reservation-card">
                <img src={bgImage} alt="Food" className="reservation-bg" />

                <div className="reservation-content">
                    <h2 className="title">we are open from</h2>
                    <h3 className="days">Monday–Sunday</h3>

                    <p className="info">Launch : Mon–Sun : 11:00am–02:00pm</p>
                    <p className="info">Dinner : Sunday : 04:00pm–08:00pm</p>
                    <p className="info1">04:00pm–09:00pm</p>

                    <div className="buttons">
                        <button className="order-btn1"  onClick={onOrderClick}>Order now</button>
                        <button className="reserve-btn2" onClick={() => navigate("reservation")} >Reservation</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Block7
