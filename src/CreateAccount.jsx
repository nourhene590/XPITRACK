import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("You must agree to the terms to create an account.");
      return;
    }

    const fullName = `${name} ${surname}`;

    const userData = {
      name: fullName,
      email,
      password,
      role: "Employee", // or "Manager" if you want to allow choice
    };

    console.log("Creating account with:", userData);

    // OPTIONAL: Connect to backend
    /*
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/Dashboard");
      } else {
        alert(data.message || "Account creation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
    */

    // TEMP: Navigate directly
    navigate("/Dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <div className="logo-container">
          <img
            src="/images/xpitrack-logo.png"
            alt="XPITrack Logo"
            className="logo"
          />
        </div>
      </div>
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Create your employee account</h1>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Last Name</label>
              <input
                type="text"
                id="surname"
                placeholder="Enter your last name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="terms-agreement">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <button className="login-button" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
