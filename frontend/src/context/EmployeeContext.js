import React, { createContext, useContext, useEffect, useState } from "react";
import { alerts } from "../helpers/alerts";
import { Request } from "../helpers/request";

const employeeContext = createContext();
const initialState = {
  id: "",
  role: "",
  name: "",
  email: "",
  token: "",
  login: false,
};
export const EmployeeProvider = (props) => {
  const [employee, setEmployee] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialEmployee = JSON.parse(localStorage.getItem("employee"));
    initialEmployee
      ? initialState.login
        ? setEmployee(initialEmployee)
        : setEmployee(initialState)
      : setEmployee(initialState);
  }, []);

  const loginEmployee = async (credentials, history) => {
    try {
      setLoading(true);
      const { data } = await Request.post("/login", credentials);
      data.login.true;
      setEmployee(data);
      alerts.sucess(`Welcome ${data.name}`);
    } catch (error) {
      setLoading(false);
      if (error.response.data.errors) {
        let msg = "";
        error.response.data.errors.forEach((element) => {
          msg += `${element.msg}; `;
        });
      }
      if (error.response.data.message) {
        alerts.error("Opps.", error.response.data.message);
      }
      console.log("Error in loginEmployee");
    }
  };

  const logout = async () => {
    setEmployee(initialEmployee);
    localStorage.removeItem("employee");
  };

  const value = {
    employee,
    loginEmployee,
    logout,
    loading,
  };

  return <employeeContext.Provider value={value} {...props} />;
};

export function useEmployee() {
  const context = useContext(employeeContext);

  if (!context) {
    throw new Error("useEmployee error");
  }

  return context;
}
