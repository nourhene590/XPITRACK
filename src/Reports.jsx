import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios"; // Import axios for HTTP requests
import "./Reports.css";

function Reports() {
  const [reportType, setReportType] = useState("stock");
  const [category, setCategory] = useState("Drinks");
  const [product, setProduct] = useState("Cake");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("Milk");
  const [threshold, setThreshold] = useState(20);
  const [expiration, setExpiration] = useState("5 DAYS");

  const [notify, setNotify] = useState({
    stockManager: true,
    manager: true,
  });

  const [method, setMethod] = useState({
    email: true,
    inApp: true,
  });

  const handleNotifyChange = (key) => {
    setNotify({ ...notify, [key]: !notify[key] });
  };

  const handleMethodChange = (key) => {
    setMethod({ ...method, [key]: !method[key] });
  };

  const handleGenerate = async () => {
    try {
      const response = await axios.post("/api/reports/generate", {
        reportType,
        category,
        product,
        startDate,
        endDate,
      });
      alert(`Report Generated ✅\n${response.data.message}`);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report.");
    }
  };

  const handleSaveAlert = async () => {
    try {
      const response = await axios.post("/api/reports/alert", {
        selectedProduct,
        threshold,
        expiration,
        notify,
        method,
      });
      alert(`Alert Saved ✅\n${response.data.message}`);
    } catch (error) {
      console.error("Error saving alert:", error);
      alert("Failed to save alert.");
    }
  };

  const handleExportPDF = () => {
    alert("PDF Exported 🧾");
    // TODO: integrate pdf generation logic (could be done in backend)
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Admin service" />
        <div className="reports-content">
          <div className="back-link">
            <i className="fas fa-arrow-left" />
          </div>

          <h2 className="page-title">
            Generation & Visualization Reports / Configuring notifications
          </h2>

          <div className="reports-container">
            {/* === REPORT SECTION === */}
            <div className="report-section">
              <h3 className="section-title">
                Generation & Visualization Reports
              </h3>
              <div className="form-group">
                <label>REPORT TYPE</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="stock">Stock</option>
                  <option value="sales">Sales</option>
                  <option value="returns">Returns</option>
                </select>
              </div>

              <div className="filter-section">
                <h4>FILTER</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>CATEGORY</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Drinks</option>
                      <option>Bakery</option>
                      <option>Dairy</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>PRODUCT</label>
                    <select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    >
                      <option>Cake</option>
                      <option>Milk</option>
                      <option>Coffee</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="period-section">
                <h4>PERIOD</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={handleGenerate}
              >
                GENERATE REPORT
              </button>
            </div>

            {/* === ALERT SETTINGS === */}
            <div className="alert-section">
              <h3 className="section-title">Alert Settings</h3>
              <div className="form-group">
                <label>SELECTED PRODUCT</label>
                <input type="text" value={selectedProduct} readOnly />
              </div>
              <div className="form-group">
                <label>Minimum Threshold:</label>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>EXPIRATION:</label>
                <input
                  type="text"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Notify:</label>
                <div className="checkbox-group">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="stock-manager"
                      checked={notify.stockManager}
                      onChange={() => handleNotifyChange("stockManager")}
                    />
                    <label htmlFor="stock-manager">Stock Manager</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="manager"
                      checked={notify.manager}
                      onChange={() => handleNotifyChange("manager")}
                    />
                    <label htmlFor="manager">Manager</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Method:</label>
                <div className="checkbox-group">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="email"
                      checked={method.email}
                      onChange={() => handleMethodChange("email")}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="in-app"
                      checked={method.inApp}
                      onChange={() => handleMethodChange("inApp")}
                    />
                    <label htmlFor="in-app">In-App notification</label>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={handleSaveAlert}
              >
                SAVE ALERT
              </button>
            </div>

            {/* === EXPORT PDF === */}
            <div className="export-section">
              <button className="btn btn-secondary" onClick={handleExportPDF}>
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
