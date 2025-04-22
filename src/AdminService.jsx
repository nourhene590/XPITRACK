import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";

function AdminService() {
  const [employees, setEmployees] = useState([]);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "Stock Management",
  });

  useEffect(() => {
    // Fetch the employee list when the component is mounted
    axios
      .get("/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    axios
      .post("/api/employees", newEmployee)
      .then((response) => {
        // Add the new employee to the employee list
        setEmployees([...employees, response.data]);
        setShowAddEmployeeForm(false); // Hide the form
        alert("Employee added successfully.");
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        alert("Failed to add employee.");
      });
  };

  const handleDeleteEmployee = (employeeId) => {
    axios
      .delete(`/api/employees/${employeeId}`)
      .then(() => {
        // Remove the employee from the list
        setEmployees(
          employees.filter((employee) => employee.id !== employeeId)
        );
        alert("Employee deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      });
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Admin service" />
        <div className="admin-content">
          <div className="back-link">
            <i className="fas fa-arrow-left" />
          </div>
          <h2 className="page-title">Employees</h2>
          <p className="page-description">Here is a list of all employees</p>

          <div className="action-bar">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddEmployeeForm(true)}
            >
              Add employee
            </button>
          </div>

          {showAddEmployeeForm && (
            <div className="add-employee-form">
              <h3>Add New Employee</h3>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={newEmployee.role}
                  onChange={handleInputChange}
                >
                  <option value="Stock Management">Stock Management</option>
                  <option value="Chef Service">Chef Service</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={handleAddEmployee}>
                Add Employee
              </button>
            </div>
          )}

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <img
                        src="/images/avatar.jpg"
                        alt="User"
                        className="user-avatar"
                      />
                      {employee.name}
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-button">Edit</button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default AdminService;
