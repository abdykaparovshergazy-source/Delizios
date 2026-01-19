import React from "react";
import "./about1.css";
import chef from '../../../assets/3.png'
import food from '../../../assets/4.png'

function About1() {
    return (
        <div className="about container">
            <div className="block">
                <div className="double-circle">
                    <div className="circle-img">
                        <img src={chef} alt="chef" />
                    </div>
                </div>

                <div className="text-box">
                    <h2>
                        <span>Our</span> restaurant
                    </h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit, sed do
                        eiusmod tempor <br /> incididunt ut labore et dolore magna <br /> aliqua. Ut enim
                        ad minim veniam, quis <br /> nostrud exercitation ullamco laboris nisi ut <br />
                        aliquip ex ea commodo consequat. <br /> Duis aute irure dolor in reprehenderit in <br />
                        voluptate velit esse.
                    </p>
                </div>
            </div>

            <div className="block">
                <div className="text-box1">
                    <p>
                        Sed ut perspiciatis unde omnis iste natus <br /> error sit voluptatem
                        accusantium <br /> doloremque laudantium, totam rem <br /> aperiam, eaque ipsa
                        quae ab illo inventore <br /> veritatis et quasi architecto beatae vitae <br />
                        dicta sunt explicabo.Nemo enim ipsam <br /> voluptatem quia voluptas sit aspernatur aut <br />
                        odit aut fugit.
                    </p>
                </div>

                <div className="double-circle">
                    <div className="circle-img">
                        <img src={food} alt="food" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About1;