import React from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"

function Profile() {
  return React.createElement(
    "div",
    { className: "app-container" },
    React.createElement(Sidebar, null),
    React.createElement(
      "div",
      { className: "main-content" },
      React.createElement(Header, { title: "Admin service" }),
      React.createElement(
        "div",
        { className: "profile-content" },
        React.createElement(
          "div",
          { className: "back-link" },
          React.createElement("i", { className: "fas fa-arrow-left" }),
        ),
        React.createElement("h2", { className: "page-title" }, "Profile"),
        React.createElement(
          "div",
          { className: "profile-card" },
          React.createElement("div", { className: "profile-avatar" }),
          React.createElement(
            "div",
            { className: "profile-info" },
            React.createElement("h3", { className: "profile-name" }, "MAJED KH"),
            React.createElement("p", { className: "profile-email" }, "majed.k@gmail.com"),
            React.createElement("p", { className: "profile-role" }, "ADMIN"),
          ),
        ),
        React.createElement("button", { className: "btn btn-primary" }, "Add User"),
      ),
    ),
  )
}

export default Profile
