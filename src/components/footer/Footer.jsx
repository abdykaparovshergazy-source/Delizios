import React from 'react'
import './footer.css'
import surot1 from '../../assets/twitter.png'
import surot2 from '../../assets/instagram.png'
import surot3 from '../../assets/facebook.png'
import { useNavigate } from 'react-router-dom'

function Footer() {

  const navigate = useNavigate()

  return (
    <div className='footer container'>
      
      <div className="footer-box">
        
        <div className="footer-left">
          <div className="logo-box">
            <div className="logo-circle">D</div>
            <h3>Delizi <span>oso</span></h3>
          </div>

          <p className="footer-text">
            Viverra gravida morbi egestas <br /> facilisis tortor
            netus non duis <br /> tempor.
          </p>

          <div className="socials">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src={surot1} alt="Twitter" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src={surot2} alt="Instagram" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src={surot3} alt="Facebook" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Page</h4>
          <p onClick={() => navigate('/')}>Home</p>
          <p onClick={() => navigate('menu')}>Menu</p>
          {/* <p>Catering</p> */}
          <p onClick={() => navigate('reservation')}>Reservation</p>
        </div>

        <div className="footer-links">
          <h4>Information</h4>
          <p onClick={() => navigate('about')}>About us</p>
          {/* <p>Testimonial</p> */}
          {/* <p>Event</p> */}
        </div>

        <div className="footer-contact">
          <h4>Get in touch</h4>
          <p>3247 Johnson Ave, Bronx, NY</p>
          <p>10463, Америка Серикат</p>
          <p>delizioso@gmail.com</p>
          <p>+123 4567 8901</p>
        </div>

      </div>

      <p className="copy">Copyright © 2022 Delizioso</p>
    </div>
  )
}

export default Footer
