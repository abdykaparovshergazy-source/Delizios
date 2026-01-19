import React, { useState } from "react";
import "./loginModal.css";

function LoginModal({ open, onClose, onLogin }) {
  if (!open) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert("Пожалуйста, заполните email и пароль", "error");
      return;
    }

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert("Неверный email или пароль ❌", "error");
        return;
      }

      localStorage.setItem("token", data.token);

      showAlert("Вы успешно вошли в систему ✅", "success");

      if (onLogin) onLogin();

      setTimeout(() => {
        setAlertOpen(false);
        onClose();
      }, 11100);

    } catch (error) {
      showAlert("Ошибка сервера. Попробуйте позже", "error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn1" onClick={handleLogin}>
          Войти
        </button>

        {alertOpen && (
          <div className="alert-overlay">
            <div className={`alert-box ${alertType}`}>
              <p>{alertMessage}</p>
              <button onClick={() => setAlertOpen(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
