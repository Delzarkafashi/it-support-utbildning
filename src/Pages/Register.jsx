import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <h1>Registrera</h1>
      <form className="register-form">
        <input type="text" placeholder="Namn" required />
        <input type="email" placeholder="E-post" required />
        <input type="password" placeholder="Lösenord" required />
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
};

export default Register;
