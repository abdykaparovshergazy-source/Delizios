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

  const phoneNumber = "996552411160"; // WhatsApp номер

  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setIsLoggedIn(true);
        setUserInfo(userData);

        if (userData.name && !names && !initialNamesSet) {
          setNames(userData.name);
          setInitialNamesSet(true);
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

  const handleNamesChange = (e) => {
    setNames(e.target.value);
  };

  const handleBook = () => {
    if (!date || !time || !people || !names) {
      setErrorOpen(true);
      setHideError(false);

      setTimeout(() => setHideError(true), 1800);
      setTimeout(() => setErrorOpen(false), 2000);
      return;
    }

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const loggedIn = !!(token && userStr);

    if (!loggedIn) {
      setLoginOpen(true);
    } else {
      // Логин болсо WhatsAppка жөнөтөбүз
      sendWhatsApp();
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
    setLoginOpen(false);

    if (userData.name && !names) {
      setNames(userData.name);
      setInitialNamesSet(true);
    }

    if (date && time && people && names) {
      setTimeout(() => {
        sendWhatsApp();
      }, 300);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("lastLogin");
    setIsLoggedIn(false);
    setUserInfo(null);
    setInitialNamesSet(false);
  };

  const sendWhatsApp = () => {
    const message = encodeURIComponent(`
      *Reservation Request*
      -----------------------
      Date: ${date}
      Time: ${time}
      Party size: ${people}
      Guest names: ${names}
      -----------------------
      ${isLoggedIn && userInfo ? `Booked by: ${userInfo.name}` : ""}
    `);

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");

    // Ушул жерде reservation success модалын да чыгарып койсо болот
    setSuccessOpen(true);
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

        <div className="input-box party-box">
          <span>{people || "Party size"}</span>
          <i className={open.people ? "arrow rotate" : "arrow"}>▼</i>
          <select
            className="select-overlay"
            value={people}
            onFocus={() => setOpen({ date: false, time: false, people: true })}
            onBlur={() => setOpen({ date: false, time: false, people: false })}
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

        <div className="input-box">
          <input
            type="text"
            className="real-input"
            placeholder="Guest names"
            value={names}
            onChange={handleNamesChange}
          />
        </div>

        <button className="btn" onClick={handleBook}>
          Book now
        </button>
      </div>

      {loginOpen && (
        <Login
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLoginSuccess}
        />
      )}

      {successOpen && (
        <div className="modal-overlay success-modal" onClick={() => setSuccessOpen(false)}>
          <div className="modal success-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h2>Reservation Confirmed</h2>
            <p className="confirmation-message">
              Your reservation request has been sent via WhatsApp.
            </p>
            <button
              className="btn modal-btn"
              onClick={() => {
                setSuccessOpen(false);
                setDate("");
                setTime("");
                setPeople("");
              }}
            >
              Done
            </button>
            <button className="close-modal-btn" onClick={() => setSuccessOpen(false)} aria-label="Close">
              ×
            </button>
          </div>
        </div>
      )}

      {errorOpen && (
        <div className={`modal-overlay ${hideError ? "hide" : ""}`}>
          <div className="modal error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon error-icon">⚠️</div>
            <h2>Please Fill All Fields</h2>
            <p>All fields are required to make a reservation.</p>
            <button className="btn modal-btn error-btn" onClick={() => setErrorOpen(false)}>
              OK, I'll fill them
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;
