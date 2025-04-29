import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h1>Logga in</h1>
      <form className="login-form">
        <input type="email" placeholder="E-post" required />
        <input type="password" placeholder="Lösenord" required />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default Login;
