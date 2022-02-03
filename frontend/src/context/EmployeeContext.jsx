import React, { createContext, useContext, useEffect, useState } from "react";
import { alerts } from "../helpers/alerts";
import { Request } from "../helpers/request";

const EmployeeContext = createContext();
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
      setEmployee({ ...data, login: true });
      localStorage.setItem("employee", JSON.stringify(employee));
      alerts.sucess(`Welcome ${data.name}`);

      data.role == "ADMINISTRATOR" || data.role == "HUMAN RESOURCES"
        ? history.push("/employees")
        : data.role == "SELLER"
        ? history.push("/customers")
        : history.push("/products");

    } catch (error) {
      debugger
      setLoading(false);
      if (error.response?.data.errors) {
        let msg = "";
        return error.response.data.errors.forEach((element) => {
          msg += `${element.msg}; `;
        });
      }
      if (error.response?.data.message) {
        return alerts.error("Opps.", error.response.data.message);
      }
      console.log("Error in loginEmployee");
    }
  };

  const logout = async () => {
    setEmployee(initialState);
    localStorage.removeItem("employee");
  };

  const value = {
    employee,
    loginEmployee,
    logout,
    loading,
  };

  return <EmployeeContext.Provider value={value} {...props} />;
};

export function useEmployee() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error("useEmployee error");
  }

  return context;
}
