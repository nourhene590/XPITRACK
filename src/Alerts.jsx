import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [settings, setSettings] = useState({ expirationAlertDays: 7 });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/alerts/settings"
        );
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();

    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alerts");
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const calculateExpiryAlert = (productExpiryDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(productExpiryDate);
    const diffTime = Math.abs(expiryDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= settings.expirationAlertDays;
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Manager Space" />
        <div className="alerts-content">
          <div className="alerts-container">
            {alerts.map((alert, index) => {
              const isNearExpiry = calculateExpiryAlert(alert.expirydate); // Use 'expirydate'

              return (
                <div key={index} className={`alert alert-${alert.type}`}>
                  {" "}
                  {/* Use 'type' */}
                  <div className="alert-content">
                    <strong>{`"${alert.product}"`}</strong> {alert.message}{" "}
                    {/* Use 'product' */}
                    {isNearExpiry && (
                      <span className="alert-warning">Near Expiry</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="legend">
            <div className="legend-item">
              <span className="legend-color legend-red" />
              Out of stock
            </div>
            <div className="legend-item">
              <span className="legend-color legend-yellow" />
              Near Expiry
            </div>
            <div className="legend-item">
              <span className="legend-color legend-green" />
              Low Stock
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
