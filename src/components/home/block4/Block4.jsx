import React from "react";
import './block4.css'
import mainPic from '../../../assets/7.png'
import small1 from '../../../assets/8.png'
import small2 from '../../../assets/9.png'
import { useNavigate } from "react-router-dom";

function Block4() {

    const navigate = useNavigate()

    return (
        <section className="block4 container">
            <div className="reservation">

                <div className="image-wrapper">
                    <div className="ring-outer"></div>
                    <div className="ring-inner"></div>

                    <div className="main-photo">
                        <img src={mainPic} alt="main-food" />
                    </div>

                    <div className="small small-top">
                        <img src={small1} alt="small1" />
                    </div>

                    <div className="small small-bottom">
                        <img src={small2} alt="small2" />
                    </div>
                </div>

                <div className="text-content">
                    <h2>
                        Let’s reserve <br />
                        <span>a table</span>
                    </h2>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Facilisis ultricies at eleifend proin.
                    </p>

                    <button
                        className="reserve-btn1" onClick={() => navigate("reservation")}> Reservation </button>
                </div>

            </div>
        </section>
    );
}

export default Block4;
