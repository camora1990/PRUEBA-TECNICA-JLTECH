import React, { useEffect, useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { NavLink, useHistory } from "react-router-dom";

import defaultUser from "../public/defaultUser.jpg";

export const Nav = ({ seteditProfile ,setlocaleEmploye,setimagePreview,setisNewEmployee}) => {
  const { employee, logout } = useEmployee();
  const [itemsMenu, setItemsMenu] = useState([]);
  const history = useHistory();
  useEffect(() => {
    switch (employee.role) {
      case "ADMINISTRATOR":
        setItemsMenu([
          { name: "Employess", path: "/employees" },
          { name: "Customers", path: "/customers" },
          { name: "Products", path: "/products" },
          { name: "Sales", path: "/sales" },
        ]);
        break;
      case "SELLER":
        setItemsMenu([{ name: "Customers", path: "/customers" }]);
        break;
      case "HUMAN RESOURCES":
        setItemsMenu([
          { name: "Employess", path: "/employees" },
          { name: "Customers", path: "/customers" },
        ]);
        break;
      case "WAREHOUSEMAN":
        setItemsMenu([{ name: "Products", path: "/products" }]);
        break;
    }
  }, [employee]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark font-monospace">
        <div className="container-fluid container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {itemsMenu.map((item) => (
                <li className="nav-item active" key={item.name}>
                  <NavLink
                    className="nav-link"
                    to={item.path}
                    exact
                    activeClassName="active"
                  >
                    {item.name} <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="dropdown d-flex text-light position-relative">
            <ul
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="dropdown-toggle dropdown-toggle bg-dark m-0 p-0"
            >
              {employee.name}
              <img
                src={employee.image ? employee.image : defaultUser}
                className="user-image ms-2"
                height={30}
                width={30}
                alt="user"
                loading="lazy"
              />
            </ul>

            <ul
              className="dropdown-menu dropdown-menu-dark end-0"
              aria-labelledby="dropdownMenuLink"
              id="my-menu"
            >
              <li className="px-2 m-1">
                <button
                  className="btn btn-secondary w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEmployee"
                  onClick={() => {
                    setisNewEmployee(false)
                    seteditProfile(true);
                    setlocaleEmploye(employee)
                    setimagePreview(employee.image)
                    
                  }}
                >
                  My profile
                </button>
              </li>
              <li className="px-2 m-1">
                <button
                  className="btn btn-secondary w-100"
                  onClick={(e) => {
                    logout(history);
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
