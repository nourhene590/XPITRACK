import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./setting.css";
import axios from "axios";

function Settings() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role is "user"
  });

  const [settings, setSettings] = useState({
    notifications: true,
    visibility: "only-me",
  });

  const [alertSettings, setAlertSettings] = useState({
    expirationAlertDays: 7, // Default to 7 days
  });

  useEffect(() => {
    // Fetch the current alert settings from the backend on page load
    const fetchAlertSettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/alerts/settings"
        );
        if (response.data) {
          setAlertSettings({
            expirationAlertDays: response.data.expirationAlertDays,
          });
        }
      } catch (error) {
        console.error("Error fetching alert settings", error);
      }
    };
    fetchAlertSettings();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAlertSettingsChange = (e) => {
    const { name, value } = e.target;
    setAlertSettings({
      ...alertSettings,
      [name]: value,
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users", // Adjust the API URL if needed
        newUser
      );
      console.log("User added:", response.data);
      setNewUser({ name: "", email: "", password: "", role: "user" }); // Reset the form

      // Show success alert
      alert("User added successfully!");
    } catch (error) {
      console.error("There was an error adding the user:", error);
      alert("Error adding user. Please try again.");
    }
  };

  const handleSaveAlertSettings = async (e) => {
    e.preventDefault();
    try {
      // Send updated alert settings to the backend
      const response = await axios.post(
        "http://localhost:5000/api/alerts/settings",
        alertSettings
      );
      alert("Alert settings saved successfully!");
    } catch (error) {
      console.error("There was an error saving the alert settings:", error);
      alert("Error saving alert settings. Please try again.");
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Admin service" />

        <div className="settings-content">
          <div
            className="back-link"
            onClick={handleGoBack}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-arrow-left"></i>
          </div>

          <h2 className="page-title">Add Employee</h2>

          <div className="profile-info">
            <form className="add-user-form" onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Temporary Password</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  placeholder="Initial password"
                  required
                />
              </div>
              {/* Role Selection */}
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="btn btn-primary" type="submit">
                Add User
              </button>
            </form>
          </div>

          <div className="settings-section">
            <h3 className="section-title settings-title">
              <i className="fas fa-cog"></i> Settings
            </h3>

            {/* Notification Settings */}
            <div className="settings-group">
              <h4 className="settings-group-title">
                <i className="fas fa-bell"></i> Notifications
              </h4>
              <div className="settings-option">
                <div className="option-label">
                  Enable Notifications
                  <p className="option-description">
                    Turn on/off all notifications
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleSettingsChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="settings-group">
              <h4 className="settings-group-title">
                <i className="fas fa-eye"></i> Visibility
              </h4>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="only-me"
                    name="visibility"
                    value="only-me"
                    checked={settings.visibility === "only-me"}
                    onChange={handleSettingsChange}
                  />
                  <label htmlFor="only-me">Only me</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="users"
                    name="visibility"
                    value="users"
                    checked={settings.visibility === "users"}
                    onChange={handleSettingsChange}
                  />
                  <label htmlFor="users">Users</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="all"
                    name="visibility"
                    value="all"
                    checked={settings.visibility === "all"}
                    onChange={handleSettingsChange}
                  />
                  <label htmlFor="all">All</label>
                </div>
              </div>
            </div>

            {/* Expiration Alert Settings */}
            <div className="settings-group">
              <h4 className="settings-group-title">
                <i className="fas fa-bell"></i> Expiration Alert Settings
              </h4>
              <div className="form-group">
                <label>Days Before Expiration</label>
                <input
                  type="number"
                  name="expirationAlertDays"
                  value={alertSettings.expirationAlertDays}
                  onChange={handleAlertSettingsChange}
                  placeholder="Enter number of days"
                  min="1"
                  required
                />
              </div>
              <form onSubmit={handleSaveAlertSettings}>
                <button className="btn btn-primary" type="submit">
                  Save Alert Settings
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="settings-group">
              <h4 className="settings-group-title">
                <i className="fas fa-lock"></i> Change Password
              </h4>
              <div className="form-group">
                <label>Current password</label>
                <input type="password" placeholder="Current password" />
              </div>
              <div className="form-group">
                <label>New password</label>
                <input type="password" placeholder="New password" />
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <button className="btn btn-secondary" type="button">
                {" "}
                {/* You'll need to implement the logic for this button */}
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
