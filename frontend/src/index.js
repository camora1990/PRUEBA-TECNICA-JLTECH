import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { EmployeeProvider } from "./context/EmployeeContext";
import 'antd/dist/antd.css';
axios.defaults.baseURL = "http://localhost:8081/api/v1";

ReactDOM.render(
  <EmployeeProvider>
    <div className="font-monospace">
      <App />
    </div>
  </EmployeeProvider>,

  document.getElementById("root")
);
