import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { alerts } from "../helpers/alerts";


const EmployeeContext = createContext();
const initialState = {
  id: "",
  role: "",
  name: "",
  email: "",
  token: "",
  address:"",
  contac:"",
  login: false,
};
export const EmployeeProvider = (props) => {
  const [employee, setEmployee] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialEmployee = JSON.parse(localStorage.getItem("employee"));
    initialEmployee
      ? initialEmployee.login
        ? setEmployee(initialEmployee)
        : setEmployee(initialState)
      : setEmployee(initialState);
  }, []);

  const loginEmployee = async (credentials, history) => {
    try {
      setLoading(true);
      const { data:response } = await axios.post("/login", credentials)
      const {data} = response
      setEmployee({ ...data, login: true });
      localStorage.setItem(
        "employee",
        JSON.stringify({ ...data, login: true })
      );
      alerts.sucess(`Welcome ${data.name}`);

      data.role == "ADMINISTRATOR" || data.role == "HUMAN RESOURCES"
        ? history.push("/employees")
        : data.role == "SELLER"
        ? history.push("/customers")
        : history.push("/products");
        setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.data.errors) {
        let msg = "";
        error.response.data.errors.forEach((element) => {
          msg += `${element.msg}; `;
        });
        return alerts.error("Erros", msg);
      }
      if (error.response?.data.message) {
        return alerts.error("Opps.", error.response.data.message);
      }
      console.log("Error in loginEmployee");
    }
  };

  const logout = async (history) => {
    setEmployee(initialState);
    history.push("/");
    localStorage.removeItem("employee");
  };

  const value = {
    employee,
    loginEmployee,
    logout,
    loading,
    setEmployee
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
