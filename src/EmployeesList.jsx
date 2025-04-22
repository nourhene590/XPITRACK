import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./EmployeesList.css";

const initialEmployees = [
  {
    id: 1,
    name: "Lindsey Stroud",
    email: "lindsey.stroud@gmail.com",
    role: "Stock Management",
    avatar: "/images/avatar.jpg",
  },
  {
    id: 2,
    name: "Sarah Brown",
    email: "sarah.brown@gmail.com",
    role: "Chef service",
    avatar: "/images/avatar.jpg",
  },
  {
    id: 3,
    name: "Michael Owen",
    email: "michael.owen@gmail.com",
    role: "Manager",
    avatar: "/images/avatar.jpg",
  },
];

function EmployeesList() {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleAdd = () => {
    const name = prompt("Enter employee name:");
    const email = prompt("Enter email:");
    const role = prompt("Enter role:");

    if (name && email && role) {
      const newEmployee = {
        id: Date.now(),
        name,
        email,
        role,
        avatar: "/images/avatar.jpg",
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Admin service" />
        <div className="employees-content">
          <div className="back-link">
            <i className="fas fa-arrow-left"></i>
          </div>
          <h2 className="page-title">Employees</h2>
          <p className="page-description">Here is a list of all employees</p>
          <div className="action-bar">
            <button className="btn btn-primary" onClick={handleAdd}>
              Add employee
            </button>
          </div>
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
                        src={employee.avatar}
                        alt="User"
                        className="user-avatar"
                      />
                      {employee.name}
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => alert("Edit not implemented yet")}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#888",
                      }}
                    >
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeesList;
