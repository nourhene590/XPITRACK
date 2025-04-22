"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

function Sidebar() {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState({
    spaceEmployers: true,
    operations: true,
    adminService: false,
    managerSpace: false,
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const isActive = (path) => {
    return location.pathname.includes(path) ? "active" : ""
  }

  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img src="/images/xpitrack-logo.png" alt="XPITrack Logo" className="logo" />
      </div>
      <ul className="nav-menu">
        <li className={`nav-item ${isActive("/dashboard")}`}>
          <Link to="/dashboard">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
        </li>

        {/* Space employers section */}
        <li className="nav-section">
          <div className="section-header" onClick={() => toggleSection("spaceEmployers")}>
            <span>Space employers</span>
            <i className={`fas fa-chevron-right ${expandedSections.spaceEmployers ? "expanded" : ""}`}></i>
          </div>

          {expandedSections.spaceEmployers && (
            <ul className="sub-menu">
              <li className={`sub-menu-item yellow-dot ${isActive("/admin-service")}`}>
                <div className="sub-menu-link" onClick={() => toggleSection("adminService")}>
                  <Link to="/admin-service">Admin service</Link>
                  <i
                    className={`fas fa-chevron-right sub-chevron ${expandedSections.adminService ? "expanded" : ""}`}
                  ></i>
                </div>
                {expandedSections.adminService && (
                  <ul className="nested-sub-menu">
                    <li className={`nested-sub-menu-item ${isActive("/admin-service/employees")}`}>
                      <Link to="/admin-service/employees">Employees list</Link>
                    </li>
                    <li className={`nested-sub-menu-item ${isActive("/admin-service/reports")}`}>
                      <Link to="/admin-service/reports">Reports</Link>
                    </li>
                    <li className={`nested-sub-menu-item ${isActive("/sales-management")}`}>
                      <Link to="/sales-management">Sales management</Link>
                    </li>
                    <li className={`nested-sub-menu-item ${isActive("/settings")}`}>
                      <Link to="/settings">Settings</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className={`sub-menu-item purple-dot ${isActive("/manager-space")}`}>
                <div className="sub-menu-link" onClick={() => toggleSection("managerSpace")}>
                  <Link to="/manager-space">Manage space</Link>
                  <i
                    className={`fas fa-chevron-right sub-chevron ${expandedSections.managerSpace ? "expanded" : ""}`}
                  ></i>
                </div>
                {expandedSections.managerSpace && (
                  <ul className="nested-sub-menu">
                    <li className={`nested-sub-menu-item ${isActive("/manager-space/alerts")}`}>
                      <Link to="/manager-space/alerts">Alerts</Link>
                    </li>
                    <li className={`nested-sub-menu-item ${isActive("/manager-space/stock")}`}>
                      <Link to="/manager-space/stock">Stock management</Link>
                    </li>
                    <li className={`nested-sub-menu-item ${isActive("/manager-space/overview")}`}>
                      <Link to="/manager-space/overview">Overview</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* Operations section */}
        <li className="nav-section">
          <div className="section-header" onClick={() => toggleSection("operations")}>
            <span>Operations</span>
            <i className={`fas fa-chevron-right ${expandedSections.operations ? "expanded" : ""}`}></i>
          </div>

          {expandedSections.operations && (
            <ul className="sub-menu">
              <li className={`sub-menu-item yellow-dot ${isActive("/sales-management")}`}>
                <Link to="/sales-management">Sales management</Link>
              </li>
              <li className={`sub-menu-item purple-dot ${isActive("/manager-space/stock")}`}>
                <Link to="/manager-space/stock">Stock management</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
