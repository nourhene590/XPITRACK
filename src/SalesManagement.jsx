import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./SalesManagement.css";

function SalesManagement() {
  return React.createElement(
    "div",
    { className: "app-container" },
    React.createElement(Sidebar, null),
    React.createElement(
      "div",
      { className: "main-content" },
      React.createElement(Header, { title: "Sales Management" }),
      React.createElement(
        "div",
        { className: "sales-content" },
        React.createElement(
          "div",
          { className: "back-link" },
          React.createElement("i", { className: "fas fa-arrow-left" }),
          "Dashboard"
        ),
        React.createElement(
          "div",
          { className: "filter-bar" },
          React.createElement(
            "button",
            { className: "btn btn-secondary" },
            "Filter by Date ",
            React.createElement("i", { className: "fas fa-chevron-down" })
          )
        ),
        React.createElement(
          "div",
          { className: "stats-container" },
          React.createElement(
            "div",
            { className: "stat-card" },
            React.createElement(
              "div",
              { className: "stat-title" },
              "Total Sales",
              React.createElement(
                "span",
                { className: "stat-change positive" },
                "16% ↑"
              )
            ),
            React.createElement("div", { className: "stat-value" }, "$612,000")
          ),
          React.createElement(
            "div",
            { className: "stat-card" },
            React.createElement(
              "div",
              { className: "stat-title" },
              "Total Customer",
              React.createElement(
                "span",
                { className: "stat-change positive" },
                "16% ↑"
              )
            ),
            React.createElement("div", { className: "stat-value" }, "2,512")
          ),
          React.createElement(
            "div",
            { className: "stat-card" },
            React.createElement(
              "div",
              { className: "stat-title" },
              "Total Transaction",
              React.createElement(
                "span",
                { className: "stat-change positive" },
                "16% ↑"
              )
            ),
            React.createElement("div", { className: "stat-value" }, "4,724")
          ),
          React.createElement(
            "div",
            { className: "stat-card" },
            React.createElement(
              "div",
              { className: "stat-title" },
              "Total Product",
              React.createElement(
                "span",
                { className: "stat-change positive" },
                "16% ↑"
              )
            ),
            React.createElement("div", { className: "stat-value" }, "124")
          )
        ),
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
                "div",
                { className: "chart-title" },
                "Total Sales",
                React.createElement(
                  "div",
                  { className: "chart-value" },
                  "$124,000"
                ),
                React.createElement(
                  "span",
                  { className: "stat-change positive" },
                  "16% ↑"
                )
              ),
              React.createElement(
                "button",
                { className: "btn btn-secondary btn-sm" },
                "Weekly ",
                React.createElement("i", { className: "fas fa-chevron-down" })
              )
            ),
            React.createElement("div", {
              className: "chart",
              id: "sales-chart",
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
                "button",
                { className: "btn btn-secondary btn-sm" },
                "Weekly ",
                React.createElement("i", { className: "fas fa-chevron-down" })
              )
            ),
            React.createElement(
              "ul",
              { className: "product-list" },
              React.createElement(
                "li",
                null,
                "Milk and its derivatives ",
                React.createElement(
                  "span",
                  { className: "percentage positive" },
                  "20%"
                )
              ),
              React.createElement(
                "li",
                null,
                "Chicken and meat ",
                React.createElement(
                  "span",
                  { className: "percentage positive" },
                  "11%"
                )
              ),
              React.createElement(
                "li",
                null,
                "Canned materials ",
                React.createElement(
                  "span",
                  { className: "percentage negative" },
                  "25%"
                )
              )
            ),
            React.createElement(
              "a",
              { href: "#", className: "see-more" },
              "See More"
            )
          )
        )
      )
    )
  );
}

export default SalesManagement;
