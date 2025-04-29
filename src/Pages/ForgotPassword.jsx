import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Fyll i din e-postadress.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Ogiltig e-postadress.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccess("Instruktioner har skickats till din e-post!");
      setEmail("");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="forgot-container">
      <h1>Återställ Lösenord</h1>
      <p>Fyll i din e-postadress så skickar vi instruktioner för att återställa lösenordet.</p>
      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          placeholder="Din e-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Skicka instruktioner"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
