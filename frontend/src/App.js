import { Login } from "./components/Login";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useEmployee } from "./context/EmployeeContext";
import { Customer } from "./components/Customer";
import { Employee } from "./components/Employee";
import { Product } from "./components/Product";
import { Sale } from "./components/Sale";
function App() {
  const { employee } = useEmployee();

  const Public = (props) => {
    const redirect = {
      ADMINISTRATOR: <Redirect to="/employees" />,
      RH: <Redirect to="/employees" />,
      SELLER: <Redirect to="/customers" />,
      WAREHOUSEMAN: <Redirect to="/products" />,
    };
    if (employee.login) {
      if (employee.role == "HUMAN RESOURCES") {
        return redirect["RH"];
      }
      return redirect[employee.role];
    } else {
      return <Route {...props} />;
    }
  };

  return (
    <Router>
      <Public path="/" exact component={Login} />
      <Route
        path="/customers"
        render={() => {
          return employee.login &&
            (employee.role == "ADMINISTRATOR" ||
              employee.role == "HUMAN RESOURCES" ||
              employee.role == "SELLER") ? (
            <Customer />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
      <Route
        path="/employees"
        render={() => {
          return employee.login &&
            (employee.role == "ADMINISTRATOR" ||
              employee.role == "HUMAN RESOURCES") ? (
            <Employee />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
      <Route
        path="/products"
        render={() => {
          return employee.login &&
            (employee.role == "ADMINISTRATOR" ||
              employee.role == "WAREHOUSEMAN") ? (
            <Product />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
      <Route
        path="/sales"
        render={() => {
          return employee.login &&
            (employee.role == "ADMINISTRATOR" || employee.role == "SELLER") ? (
            <Sale />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    </Router>
  );
}

export default App;
