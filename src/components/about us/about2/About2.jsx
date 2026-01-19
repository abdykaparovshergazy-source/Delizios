import React from "react";
import "./about2.css";
import chef1 from '../../../assets/5.png'; // сүрөтүңдүн жолун өзгөрт

function About2() {
  return (
    <div className="about2 container">
      <div className="left">
        <img src={chef1} alt="chef" />
      </div>

      <div className="right">
        <h2>
          <span>Owner</span> $ <br /> Executive Chef
        </h2>

        <h3 className="name">Ismail Marzuki</h3>

        <div className="quote-box">
          <div className="quote-icon">“</div>
          <p>
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit, sed <br /> do
            eiusmod tempor incididunt ut <br /> labore et dolore magna aliqua.
          </p>
          <div className="quote-icon end">”</div>
        </div>
      </div>
    </div>
  );
}

export default About2;