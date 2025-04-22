import React from "react";
import { Link } from "react-router-dom";

function Header({ title, alertCount }) {
  return (
    <header className="header">
      <div className="header-title">{title}</div>
      <div className="search-bar">
        <input type="text" placeholder="Search here" />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="user-profile">
        <div className="notification-icon">
          <i className="fas fa-bell"></i>
          {alertCount > 0 && (
            <span className="notification-badge">{alertCount}</span>
          )}
        </div>
        <Link to="/profile">
          <img src="/images/avatar.jpg" alt="User Avatar" className="avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
