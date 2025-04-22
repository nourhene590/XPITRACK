import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Dashboard from "./Dashboard";
import AdminService from "./AdminService";
import ManagerSpace from "./ManagerSpace";
import EmployeesList from "./EmployeesList";
import Reports from "./Reports";
import SalesManagement from "./SalesManagement";
import Settings from "./Settings";
import Profile from "./Profile";
import StockManagement from "./StockManagement";
import Alerts from "./Alerts";
import Overview from "./Overview";

import { ProductProvider } from "./ProductContext"; // ✅ Add this

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    { path: "/login", element: <Login /> },
    { path: "/create-account", element: <CreateAccount /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/admin-service", element: <AdminService /> },
    { path: "/admin-service/employees", element: <EmployeesList /> },
    { path: "/admin-service/reports", element: <Reports /> },
    { path: "/admin-service/profile", element: <Profile /> },
    { path: "/manager-space", element: <ManagerSpace /> },
    { path: "/manager-space/alerts", element: <Alerts /> },
    { path: "/manager-space/stock", element: <StockManagement /> },
    { path: "/manager-space/overview", element: <Overview /> },
    { path: "/reports", element: <Reports /> },
    { path: "/sales-management", element: <SalesManagement /> },
    { path: "/settings", element: <Settings /> },
  ]);

  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
}

export default App;
