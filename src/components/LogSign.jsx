import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LogSign.css";

const LogSign = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const roleName = (level) => {
    switch (level) {
      case 1:
        return "Admin";
      case 2:
        return "Team";
      case 3:
        return "Användare";
      default:
        return "Okänd";
    }
  };

  const handleLogout = () => {
    logout();           // Rensar token & användare
    navigate("/");      // Skickar till startsidan
  };

  if (user) {
    return (
      <div className="logsign-buttons">
        <div className="welcome-text">
          <div>👋 <strong>Välkommen!</strong></div>
          <div>
            <strong>{user.name}</strong> ({roleName(user.access_level)})
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          🔓 Logga ut
        </button>
      </div>
    );
  }

  return (
    <div className="logsign-buttons">
      <Link to="/login" className="btn-login">🔑 Logga in</Link>
      <Link to="/register" className="btn-register">📝 Registrera</Link>
    </div>
  );
};

export default LogSign;
