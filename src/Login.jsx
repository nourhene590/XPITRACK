import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec:", email, password);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <div className="logo-container">
          <img src="/images/xpitrack-logo.png" alt="XPITrack Logo" className="logo" />
        </div>
      </div>
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Login Member</h1>
          <div className="login-subtitle">
            Or <Link to="/create-account">Create an account</Link>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Write you email address here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Write you password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <div className="terms-agreement">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              Sign in with this account means means that you have the accessibility to enter if not contact the administration help.
            </label>
          </div>
          <div className="help-link">
            <Link to="/help">Help</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;