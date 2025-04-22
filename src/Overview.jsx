import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useProducts } from "./ProductContext"; // Import the context
import "./Overview.css";

function Overview() {
  const { products } = useProducts(); // Get products from context

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Manager space" />
        <div className="overview-content">
          <div className="back-link">
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle"></i>
            The product is Near expiration:{" "}
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Snag</th>
                  <th>Expiration Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>{product.snag}</td>
                    <td>{product.expiryDate}</td>
                    <td className={`status ${product.status.toLowerCase()}`}>
                      {product.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
