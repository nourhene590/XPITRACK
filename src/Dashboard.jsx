import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Dashboard.css";
function Dashboard() {
  return React.createElement(
    "div",
    { className: "app-container" },
    React.createElement(Sidebar, {}),
    React.createElement(
      "div",
      { className: "main-content" },
      React.createElement(Header, { title: "Dashboard" }),
      React.createElement(
        "div",
        { className: "dashboard" },
        React.createElement(
          "div",
          { className: "stats-container" },
          React.createElement(
            "div",
            { className: "stat-card" },
            React.createElement(
              "div",
              { className: "stat-title" },
              "Milk And Derivations",
              React.createElement("span", null, "Purple View")
            ),
            React.createElement("div", { className: "stat-value" }, "$151.74")
          ),
          React.createElement(
            "div",
            { className: "stat-card" },
            React.createElement(
              "div",
              { className: "stat-title" },
              "Milk And Derivations",
              React.createElement("span", null, "Golden View")
            ),
            React.createElement("div", { className: "stat-value" }, "$177.90")
          ),
          React.createElement(
            "div",
            { className: "stat-card" },
            React.createElement(
              "div",
              { className: "stat-title" },
              "Milk And Derivations",
              React.createElement("span", null, "Green View")
            ),
            React.createElement("div", { className: "stat-value" }, "$145.03")
          )
        ),
        React.createElement(
          "h2",
          { className: "dashboard-title" },
          "Figures Products"
        ),
        React.createElement("div", {}, "Figures Products"),
        React.createElement(
          "div",
          { className: "chart-container" },
          React.createElement(
            "div",
            { className: "chart-card" },
            React.createElement(
              "div",
              { className: "chart-header" },
              React.createElement(
                "h3",
                { className: "chart-title" },
                "Products Statistics"
              ),
              React.createElement(
                "select",
                { className: "chart-filter" },
                React.createElement("option", null, "This year"),
                React.createElement("option", null, "Last year")
              )
            ),
            React.createElement("div", {
              className: "chart",
              id: "products-chart",
            })
          ),
          React.createElement(
            "div",
            { className: "chart-card" },
            React.createElement(
              "div",
              { className: "chart-header" },
              React.createElement(
                "h3",
                { className: "chart-title" },
                "Popular Product"
              ),
              React.createElement(
                "select",
                { className: "chart-filter" },
                React.createElement("option", null, "Weekly"),
                React.createElement("option", null, "Monthly")
              )
            ),
            React.createElement(
              "ul",
              { className: "product-list" },
              React.createElement(
                "li",
                null,
                "Milk and its derivatives ",
                React.createElement("span", null, "20%")
              ),
              React.createElement(
                "li",
                null,
                "Chicken and meat ",
                React.createElement("span", null, "11%")
              ),
              React.createElement(
                "li",
                null,
                "Canned materials ",
                React.createElement("span", null, "25%")
              )
            ),
            React.createElement(
              "a",
              { href: "#", className: "see-more" },
              "See More"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "tabs-container" },
          React.createElement(
            "div",
            { className: "tabs" },
            React.createElement(
              "button",
              { className: "tab active" },
              "Total Users"
            ),
            React.createElement(
              "button",
              { className: "tab" },
              "Total Products"
            ),
            React.createElement(
              "button",
              { className: "tab" },
              "Operating Status"
            )
          ),
          React.createElement(
            "div",
            { className: "tab-filters" },
            React.createElement(
              "button",
              { className: "tab-filter active" },
              "This year"
            ),
            React.createElement(
              "button",
              { className: "tab-filter" },
              "Last year"
            )
          )
        ),
        React.createElement("div", { className: "chart", id: "users-chart" })
      )
    )
  );
}

export default Dashboard;
