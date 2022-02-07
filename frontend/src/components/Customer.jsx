import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import axios from "axios";
import { Loading } from "./Loading";
import { alerts } from "../helpers/alerts";
import { Pagination } from "antd";
import Swal from "sweetalert2";
import { useEmployee } from "../context/EmployeeContext";

export const Customer = () => {
  const initialCustomer = {
    name: "",
    contact: "",
    address: "",
    email: "",
  };

  const { employee } = useEmployee();
  const [options, setOptions] = useState({});
  const [customers, setCustomers] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [customer, setCustomer] = useState(initialCustomer);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, settotalData] = useState(0);
  const [pageSize, setpageSize] = useState(0);

  const getCustomers = async (options, page = 1) => {
    try {
      setLoading(true);
      const { data: response } = await axios(
        `/customers/?page=${page}`,
        options
      );
      const { customers } = response.data;
      setPage(response.data.information.page);
      settotalData(response.data.information.totalDocs);
      setpageSize(response.data.information.limit);
      setCustomers(customers);
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
      console.log("Error in listEmployees");
    }
  };

  const deleteCustomer = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.delete(`/customers/${id}`, options);
          Swal.fire("Deleted!", "Customer has been deleted.", "success");
          getCustomers(options);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          if (error.response?.data.errors) {
            let msg = "";
            error.response.data.errors.forEach((element) => {
              msg += `${element.msg}; `;
            });
            return alerts.error("Opps.", msg);
          }
          if (error.response?.data.message) {
            return alerts.error("Opps.", error.response.data.message);
          }
          console.log("Error in deleteCustomer");
        }
      }
    });
  };

  const createCustomer = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.post(`/customers/`, data, options);
          Swal.fire("Created!", "Customer has been created.", "success");
          getCustomers(options);
          setLoading(false);
          document.getElementById("closeModalCustomer").click();
        } catch (error) {
          setLoading(false);
          if (error.response?.data.errors) {
            let msg = "";
            error.response.data.errors.forEach((element) => {
              msg += `${element.msg}; `;
            });
            return alerts.error("Opps.", msg);
          }
          if (error.response?.data.message) {
            return alerts.error("Opps.", error.response.data.message);
          }
          console.log("Error in createCustomer");
        }
      }
    });
  };

  const onChangePage = (page) => {
    getCustomers(options, page);
  };


  const editCustomer = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.put(`/customers/${data.id}`, data, options);
          document.getElementById("closeModalCustomer").click();
          Swal.fire("Updated!", "Customer has been Updated.", "success");
          getCustomers(options);
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
          console.log("Error in editCustomer");
        }
      }
    });
  };

  const actions = (e) => {
    e.preventDefault();
    !isEdit ? createCustomer(customer) : editCustomer(customer);
  };


  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("employee"));
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setOptions(headers);
    getCustomers(headers);
  }, []);

  return (
    <>
      <Nav />
      {loading && <Loading />}
      <div className="container mt-2">
        <h2 className="text-center">Customers</h2>

        {customers.length == 0 ? (
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Oops...! {employee.name}</h4>
            <p className="fs-6">There are no customer available yet</p>
            <hr />
            <p className="mb-0">
              click{" "}
              <a
                href="#"
                className="alert-link"
                data-bs-toggle="modal"
                data-bs-target="#customerModal"
                onClick={() => {
                  setisEdit(false);
                }}
              >
                here
              </a>{" "}
              to create customer
            </p>
          </div>
        ) : (
          <>
            <button
              className="btn bg-dark text-light mb-3 "
              data-bs-toggle="modal"
              data-bs-target="#customerModal"
              onClick={() => {
                setisEdit(false);
                setCustomer(initialCustomer);
              }}
            >
              {" "}
              Create new customer
            </button>
            <div
              className="tab-pane fade show active"
              id="compara"
              role="tabpanel"
              aria-labelledby="compara-tab"
            >
              <div className="table-responsive">
                <table
                  className="table table-striped table-dark table-bordered table-hover shadow bg-body rounded align-middle"
                  style={{ minWidth: 1000 }}
                >
                  <thead className="text-center">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col ">NAME</th>
                      <th scope="col">CONTACT</th>
                      <th scope="col">ADDRESS</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr
                        className="table-light text-center"
                        key={customer._id}
                      >
                        <td>{index + 1}</td>
                        <td>{customer.name}</td>
                        <td style={{ maxWidth: 300 }}>{customer.contact}</td>
                        <td>{customer.address.toLocaleString()}</td>
                        <td>{customer.email}</td>
                        <td>
                          <div className="d-flex w-100 justify-content-evenly">
                            <i
                              className="fas fa-trash-alt fw-bold"
                              onClick={() => {
                                deleteCustomer(customer._id);
                              }}
                            ></i>
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#customerModal"
                              className="fas fa-pen fw-bold"
                              onClick={() => {
                                setisEdit(true);
                                setCustomer({
                                  name: customer.name,
                                  contact: customer.contact,
                                  address: customer.address,
                                  email: customer.email,
                                  id: customer._id,
                                });
                              }}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <Pagination
                current={page}
                total={totalData + 1}
                PageSize={pageSize}
                onChange={onChangePage}
              />
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <div
        className="modal font-monospace "
        id="customerModal"
        tabIndex="-1"
        aria-labelledby="customerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog position-relative">
          <div className="modal-content">
            <div className="modal-header p-2">
              <h5 className="modal-title" id="customerModalLabel">
                {isEdit ? "Edit customer" : "Create new customer"}
              </h5>
              <button
                id="closeModalCustomer"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <div className="card h-100 border-0">
                <div className="d-flex justify-content-center mt-1"></div>
                <div className="card-body">
                  <form onSubmit={actions}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control border"
                        placeholder="Name"
                        id="floatingInput"
                        value={customer.name}
                        required={true}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            name: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="floatingInput">Name</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        id="floatingPrice"
                        className="form-control"
                        placeholder="Phone"
                        required={true}
                        value={customer.contact}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            contact: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="floatingPrice">Phone</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        name="address"
                        id="floatingAddress"
                        cols="30"
                        rows="20"
                        required={true}
                        className="form-control"
                        placeholder="Address"
                        value={customer.address}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            address: e.target.value,
                          });
                        }}
                      ></input>
                      <label htmlFor="floatingDescription">Address</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        name="email"
                        id="floatingEmail"
                        cols="30"
                        rows="20"
                        className="form-control"
                        placeholder="Email"
                        required={true}
                        value={customer.email}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            email: e.target.value,
                          });
                        }}
                      ></input>
                      <label htmlFor="floatingEmail">Email</label>
                    </div>

                    <button
                      className="btn btn-save btn btn-dark btn-lg btn-block form-control"
                      onClick={() => {}}
                    >
                      {!isEdit ? "Save customer" : "Edit customer"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
