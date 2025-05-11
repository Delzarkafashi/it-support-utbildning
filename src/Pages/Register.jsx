import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
  
    if (!name || !email || !password) {
      setMessage({ text: "Alla fält måste fyllas i.", type: "error" });
      return;
    }
  
    if (!validateEmail(email)) {
      setMessage({ text: "Ogiltig e-postadress.", type: "error" });
      return;
    }
  
    if (password.length < 6) {
      setMessage({ text: "Lösenord måste vara minst 6 tecken.", type: "error" });
      return;
    }
  
    try {
      const response = await fetch("https://localhost:7266/api/User/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const text = await response.text();
  
      if (response.ok) {
        setMessage({ text, type: "success" });
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage({ text, type: "error" });
      }
    } catch (error) {
      console.error("Något gick fel:", error);
      setMessage({ text: "Serverfel, försök igen senare.", type: "error" });
    }
  };
  

  return (
    <div className="register-container">
      <h1>Registrera</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <span className="input-icon">👤</span>
          <input
            type="text"
            placeholder="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-icon">✉️</span>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit">Registrera</button>
      </form>
    </div>
  );
};

export default Register;
