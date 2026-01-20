import React, { useRef, useState, useEffect, useCallback } from "react";
import "./reservation.css";
import img from "../../../assets/6.png";
import Login from "../../login/Login";

function Reservation() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [names, setNames] = useState(""); 
  const [initialNamesSet, setInitialNamesSet] = useState(false); 

  const [open, setOpen] = useState({
    date: false,
    time: false,
    people: false,
  });

  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const [hideError, setHideError] = useState(false);

  // Логин статусун текшерүү функциясы
  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setIsLoggedIn(true);
        setUserInfo(userData);
        
        // Guest names алдын ала толтуруу - бир гана жолу
        if (userData.name && !names && !initialNamesSet) {
          setNames(userData.name);
          setInitialNamesSet(true); // Бир жолу гана толтурулганын белгилөө
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loginMethod");
        localStorage.removeItem("lastLogin");
        setIsLoggedIn(false);
        setUserInfo(null);
        setInitialNamesSet(false);
      }
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
      setInitialNamesSet(false);
    }
  }, [names, initialNamesSet]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus, loginOpen]);

  // Book now логикасы
  const handleBook = () => {
    // Бардык талаалар толтурулганын текшерүү
    if (!date || !time || !people || !names) {
      setErrorOpen(true);
      setHideError(false);

      setTimeout(() => setHideError(true), 1800);
      setTimeout(() => setErrorOpen(false), 2000);
      return;
    }

    // localStorage'дан логин статусун текшерүү
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const loggedIn = !!(token && userStr);
    
    if (!loggedIn) {
      setLoginOpen(true);
    } else {
      setSuccessOpen(true);
    }
  };

  // Логин ийгиликтүү болгондо
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
    setLoginOpen(false);
    
    // Guest names алдын ала толтуруу - бир гана жолу логинделгенде
    if (userData.name && !names) {
      setNames(userData.name);
      setInitialNamesSet(true);
    }
    
    // Логинден кийин автоматтык түрдө резервацияны ырастоо
    if (date && time && people) {
      setTimeout(() => {
        setSuccessOpen(true);
      }, 300);
    }
  };

  // Логаут функциясы
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("lastLogin");
    setIsLoggedIn(false);
    setUserInfo(null);
    setInitialNamesSet(false);
    // Guest names талаасын тазалоо - optional
    // setNames(""); 
  };

  // Guest names талаасын өзгөрткөндө
  const handleNamesChange = (e) => {
    const value = e.target.value;
    setNames(value);
    
    // Эгерде колдонуучу талааны өзү өзгөртсө, initialNamesSet'ти false кылуу керек эмес
    // Анткени ал өзү каалаган атты жаза алат
  };

  return (
    <div className="reservation-wrapper">
      <div className="image-side">
        <div className="outer-circle">
          <div className="inner-circle">
            <img src={img} alt="Restaurant" />
          </div>
        </div>
      </div>

      <div className="form-side">
        <h1>Book a table</h1>
        
        {/* Логин статусун көрсөтүүчү элемент */}
        {/* {isLoggedIn && userInfo && (
          <div className="login-status">
            <div className="user-info-display">
              <span className="logged-in-text">Logged in as:</span>
              <strong className="user-name">{userInfo.name}</strong>
              {userInfo.email && (
                <span className="user-email">({userInfo.email})</span>
              )}
            </div>
            <button 
              className="logout-btn-small" 
              onClick={handleLogout}
              title="Logout"
            >
              ✕
            </button>
          </div>
        )} */}

        {/* DATE */}
        <div className="input-box">
          <span>{date || "Date"}</span>
          <i
            className={open.date ? "arrow rotate" : "arrow"}
            onClick={() => {
              setOpen({ date: true, time: false, people: false });
              dateRef.current?.showPicker();
            }}
          >
            ▼
          </i>
          <input
            type="date"
            ref={dateRef}
            className="hidden-input"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setOpen({ date: false, time: false, people: false });
            }}
          />
        </div>

        {/* TIME */}
        <div className="input-box">
          <span>{time || "Time"}</span>
          <i
            className={open.time ? "arrow rotate" : "arrow"}
            onClick={() => {
              setOpen({ date: false, time: true, people: false });
              timeRef.current?.showPicker();
            }}
          >
            ▼
          </i>
          <input
            type="time"
            ref={timeRef}
            className="hidden-input"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setOpen({ date: false, time: false, people: false });
            }}
          />
        </div>

        {/* PARTY SIZE */}
        <div className="input-box party-box">
          <span>{people || "Party size"}</span>
          <i className={open.people ? "arrow rotate" : "arrow"}>▼</i>

          <select
            className="select-overlay"
            value={people}
            onFocus={() =>
              setOpen({ date: false, time: false, people: true })
            }
            onBlur={() =>
              setOpen({ date: false, time: false, people: false })
            }
            onChange={(e) => {
              setPeople(e.target.value);
              setOpen({ date: false, time: false, people: false });
            }}
          >
            <option value="">Party size</option>
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5+">5+ people</option>
          </select>
        </div>

        {/* GUEST NAMES - ТУУРА ВЕРСИЯ */}
        <div className="input-box">
          <input
            type="text"
            className="real-input"
            placeholder="Guest names"
            // value={names}
            onChange={handleNamesChange}
          />
          {/* {isLoggedIn && userInfo && names === userInfo.name && (
            <div className="auto-filled-hint">
              <small>Auto-filled from your account</small>
            </div>
          )} */}
        </div>

        <button className="btn" onClick={handleBook}>
          Book now
        </button>
      </div>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <Login
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLoginSuccess}
        />
      )}

      {/* RESERVATION SUCCESS MODAL */}
      {successOpen && (
        <div className="modal-overlay success-modal" onClick={() => setSuccessOpen(false)}>
          <div className="modal success-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h2>Reservation Confirmed</h2>
            
            <div className="reservation-details">
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{time}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Party Size:</span>
                <span className="detail-value">{people} {people === "1" ? "person" : "people"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Guests:</span>
                <span className="detail-value">{names}</span>
              </div>
              {isLoggedIn && userInfo && (
                <div className="detail-row">
                  <span className="detail-label">Booked by:</span>
                  <span className="detail-value">{userInfo.name}</span>
                </div>
              )}
            </div>
            
            <p className="confirmation-message">
              Your table has been reserved successfully! 
              We look forward to serving you.
            </p>
            
            <button
              className="btn modal-btn"
              onClick={() => {
                setSuccessOpen(false);
                setDate("");
                setTime("");
                setPeople("");
                // Guest names талаасын тазалабоо
              }}
            >
              Done
            </button>
            
            <button 
              className="close-modal-btn"
              onClick={() => setSuccessOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
      {errorOpen && (
        <div className={`modal-overlay ${hideError ? "hide" : ""}`}>
          <div className="modal error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon error-icon">⚠️</div>
            <h2>Please Fill All Fields</h2>
            <p>All fields are required to make a reservation.</p>
            <button 
              className="btn modal-btn error-btn"
              onClick={() => setErrorOpen(false)}
            >
              OK, I'll fill them
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;