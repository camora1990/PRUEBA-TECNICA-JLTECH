import { Login } from "./components/Login";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useEmployee } from "./context/EmployeeContext";
function App() {
  const {employee} = useEmployee()
  const Public =(props)=>{
    return employee.login? <Redirect to="/temporal" />: <Route {...props} />
  }

  return (
    <Router>
      <Public path="/" exact component={Login} />
    </Router>
  );
}

export default App;
