import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import "./managersapace.css";

const ManagerSpace = () => {
  const [auditData, setAuditData] = useState([]);
  const [form, setForm] = useState({
    product: "", // product will store the product _id
    systemQty: "",
    physicalQty: "",
  });
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data); // Store the entire product object in state
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Handle changes in form fields
  const handleChange = (e) => {
    if (e.target.name === "product") {
      const selectedProduct = products.find((p) => p.name === e.target.value); // Find the product by name
      setForm({ ...form, product: selectedProduct._id }); // Store the product _id
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Add audit data
  const handleAddAudit = async () => {
    const { product, systemQty, physicalQty } = form;
    const difference = physicalQty - systemQty;

    // Send audit data to backend
    try {
      await axios.post("http://localhost:5000/api/audits", {
        productId: product, // Send the product _id to the backend
        systemQty,
        physicalQty,
      });
      setAuditData([...auditData, { ...form, difference }]);
      setForm({ product: "", systemQty: "", physicalQty: "" }); // Clear form
    } catch (err) {
      console.error("Error adding audit:", err);
    }
  };

  // Delete audit entry
  const handleDelete = (productId) => {
    setAuditData(auditData.filter((entry) => entry.product !== productId)); // Remove by product _id
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Manager Space" />

        {/* Inventory Audit */}
        <div className="inventory-audit">
          <h3>Inventory Audit</h3>
          <p>Perform a physical stock count and update your system.</p>

          <div className="audit-form">
            <select name="product" value={form.product} onChange={handleChange}>
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="systemQty"
              placeholder="System Quantity"
              value={form.systemQty}
              onChange={handleChange}
            />
            <input
              type="number"
              name="physicalQty"
              placeholder="Physical Quantity"
              value={form.physicalQty}
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={handleAddAudit}>
              Add to Table
            </button>
          </div>

          <table className="audit-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>System Qty</th>
                <th>Physical Qty</th>
                <th>Difference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.product}</td>
                  <td>{entry.systemQty}</td>
                  <td>{entry.physicalQty}</td>
                  <td>{entry.difference}</td>
                  <td>
                    <button onClick={() => handleDelete(entry.product)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerSpace;
