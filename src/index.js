import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ⬅️ Import the ProductProvider
import { ProductProvider } from "./ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* ⬅️ Wrap App with ProductProvider */}
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>
);

// Optional performance logging
reportWebVitals();
