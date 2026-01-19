import React, { useState, useEffect } from "react";
import "./login.css";
import food from "../../assets/Login.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import LoginModal from "../loginModal/LoginModal";

function Login({ open, onClose, onLogin }) {
  if (!open) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checkout үчүн функция
  const handleQuickCheckout = () => {
    if (isLoggedIn && loggedInUser) {
      return {
        fullName: loggedInUser.name,
        email: loggedInUser.email,
        phone: "",
        address: "",
        paymentMethod: "cash"
      };
    }
    return null;
  };

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }

    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);
        setLoggedInUser(user);
        setIsLoggedIn(true);
        console.log("Автоматтык түрдө логинделди:", user.name);
      } catch (error) {
        console.error("Пользовательские данные повреждены:", error);
        localStorage.clear();
      }
    }
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      showAlert("Пожалуйста, заполните email и пароль", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Пожалуйста, введите корректный email", "error");
      return;
    }

    if (remember) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    const userData = {
      name: email.split("@")[0],
      email: email,
      provider: "email",
      id: Date.now().toString(),
      avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=ff8a00&color=fff`
    };

    localStorage.setItem("token", "demo-token-" + Date.now());
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginMethod", "email");
    localStorage.setItem("lastLogin", new Date().toISOString());

    setLoggedInUser(userData);
    setIsLoggedIn(true);

    showAlert(`Добро пожаловать, ${userData.name}! ✅`, "success");

    if (onLogin) onLogin(userData);

    setTimeout(() => {
      setAlertOpen(false);
      onClose();
    }, 900);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decodeJwt = (token) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error("Ошибка декодирования JWT:", error);
          return null;
        }
      };

      const userData = decodeJwt(credentialResponse.credential);
      if (!userData) {
        showAlert("Ошибка при входе через Google ❌", "error");
        return;
      }

      const googleUser = {
        name: userData.name || userData.given_name,
        email: userData.email,
        provider: "google",
        id: userData.sub,
        avatar: userData.picture || `https://ui-avatars.com/api/?name=${userData.name}&background=4285F4&color=fff`,
        token: credentialResponse.credential
      };

      localStorage.setItem("token", credentialResponse.credential);
      localStorage.setItem("user", JSON.stringify(googleUser));
      localStorage.setItem("loginMethod", "google");
      localStorage.setItem("lastLogin", new Date().toISOString());

      if (remember) localStorage.setItem("rememberEmail", googleUser.email);

      setLoggedInUser(googleUser);
      setIsLoggedIn(true);

      showAlert(`Добро пожаловать, ${googleUser.name}! 👋`, "success");

      if (onLogin) onLogin(googleUser);

      setTimeout(() => {
        setAlertOpen(false);
        onClose();
      }, 1000);

    } catch (error) {
      console.error("Google login error:", error);
      showAlert("Ошибка при входе через Google ❌", "error");
    }
  };

  const handleGoogleError = () => {
    showAlert("Не удалось войти через Google ❌", "error");
  };

  const handleLogout = () => {
    if (loggedInUser?.provider === "google") googleLogout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("lastLogin");

    if (!remember) localStorage.removeItem("rememberEmail");

    setLoggedInUser(null);
    setIsLoggedIn(false);
    setPassword("");

    showAlert("Вы успешно вышли из системы 👋", "info");

    if (onLogin) onLogin(null);

    setTimeout(() => {
      setAlertOpen(false);
    }, 1500);
  };

  const renderUserProfile = () => {
    if (!isLoggedIn || !loggedInUser) return null;

    return (
      <div className="user-profile-section">
        <div className="user-info">
          {loggedInUser.avatar && <img src={loggedInUser.avatar} alt={loggedInUser.name} className="user-avatar" />}
          <div className="user-details">
            <h3>{loggedInUser.name}</h3>
            <p>{loggedInUser.email}</p>
            <small>Вход через: {loggedInUser.provider === "google" ? "Google" : "Email"}</small>
          </div>
        </div>
        <div className="profile-buttons">
          <button className="logout-btn" onClick={handleLogout}>Выйти</button>
          <button 
            className="switch-account-btn" 
            onClick={() => {
              handleLogout();
              // Форма кайра көрүнөт, анткени isLoggedIn false болот
            }}
          >
            Сменить аккаунт
          </button>
        </div>
      </div>
    );
  };

  const renderLoginForm = () => {
    return (
      <>
        <div className="logo-circle">D</div>
        <h1>Login</h1>

        <label>Email</label>
        <input
          type="email"
          className="clean-input"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="password-input"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className={`toggle-password ${showPassword ? 'show' : ''}`}
            onClick={() => {
              console.log('Коз басылды!', showPassword);
              setShowPassword(!showPassword);
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowPassword(!showPassword);
              }
            }}
          >
            <svg
              className="eye-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </>
              )}
            </svg>
          </button>
        </div>

        <div className="options">
          <div>
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember" style={{ marginLeft: '6px', cursor: 'pointer' }}>
              Remember me
            </label>
          </div>
        </div>

        <button className="login-btn1" onClick={handleLogin}>Log in</button>

        <div className="google-login-wrapper">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} useOneTap />
        </div>
      </>
    );
  };

  return (
    <div className="modal-overlay" onClick={handleBackgroundClick}>
      <div className="modal-box large-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="login-container">
          <div className="login-left">
            {/* Эгер логинделген болсо, профилди гана көрсөт */}
            {/* Эгер логинделбесе, логин формасын гана көрсөт */}
            {isLoggedIn && loggedInUser ? renderUserProfile() : renderLoginForm()}
            <p className="copyright">Copyright © 2022 Delizioso</p>
          </div>
          <div className="login-right">
            <img src={food} alt="food" />
          </div>
        </div>

        {alertOpen && (
          <div className="alert-overlay">
            <div className={`alert-box ${alertType}`}>
              <p>{alertMessage}</p>
              <button onClick={() => setAlertOpen(false)}>OK</button>
            </div>
          </div>
        )}

        <LoginModal />
      </div>
    </div>
  );
}

export default Login;