import axios from "axios";
import React, { useEffect, useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { alerts } from "../helpers/alerts";
import defaultUser from "../public/defaultUser.jpg";
import { Loading } from "./Loading";
import { Nav } from "./Nav";
import { Pagination } from "antd";
import Swal from "sweetalert2";

export const Employee = () => {
  const initialState = {
    id: "",
    role: "ADMINISTRATOR",
    name: "",
    email: "",
    image: "",
    address: "",
    contact: 0,
  };
  const { employee, setEmployee } = useEmployee();
  const [employees, setEmployees] = useState([]);
  const [localeEmploye, setlocaleEmploye] = useState({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [editProfile, seteditProfile] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, settotalData] = useState(0);
  const [pageSize, setpageSize] = useState(0);
  const [imagePreview, setimagePreview] = useState("");
  const [image, setimage] = useState([]);
  const [isNewEmployee, setisNewEmployee] = useState(false);

  const listEmployees = async (options, page = 1) => {
    try {
      setLoading(true);
      const { data: response } = await axios.get(
        `/employees/?limit=9&page=${page}`,
        options
      );
      const { employees } = response.data;
      setPage(response.data.information.page);
      settotalData(response.data.information.totalDocs);
      setpageSize(response.data.information.limit);
      setEmployees(employees);
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

  const onChangePage = (page) => {
    listEmployees(options, page);
  };

  const editEmployee = async (formdata, id = "") => {
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
          const { data: response } = await axios.put(
            `/employees/${id}`,
            formdata,
            options
          );
          document.getElementById("close-modal-employee").click();
          Swal.fire("Updated!", "Employee has been Updated.", "success");
          listEmployees(options);
          setLoading(false);
          debugger;

          if (editProfile) {
            localStorage.setItem(
              "employee",
              JSON.stringify({
                ...employee,
                name: response.data.name,
                address: response.data.address,
                contact: response.data.contact,
                image: response.data.image,
              })
            );
            setEmployee({
              ...employee,
              name: response.data.name,
              address: response.data.address,
              contact: response.data.contact,
              image: response.data.image,
            });
          }
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
          console.log("Error in editEmployee");
        }
      }
    });
  };

  const createEmployee = async (formData) => {
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
          await axios.post(`/employeess/`, formData, options);
          document.getElementById("close-modal-employee").click();
          Swal.fire("Created!", "Employee has been created.", "success");
          listEmployees(options);
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
          console.log("Error in editEmployee");
        }
      }
    });
  };

  const deleteEmployee = async (id) => {
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
          await axios.delete(`/employees/${id}`, options);
          Swal.fire("Deleted!", "Employee has been deleted.", "success");
          listEmployees(options);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          if (error.response?.data.errors) {
            let msg = "";
             error.response.data.errors.forEach((element) => {
              msg += `${element.msg}; `;
            });
            return alerts.error("Opps.", msg)
          }
          if (error.response?.data.message) {
            return alerts.error("Opps.", error.response.data.message);
          }
          console.log("Error in deleteEmployee");
        }
      }
    });
  };

  const action = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    image.length > 0 && formData.append("image", image[0]);
    formData.append("name", localeEmploye.name);
    formData.append("contact", localeEmploye.contact);
    isNewEmployee && formData.append("address", localeEmploye.address);
    isNewEmployee && formData.append("password", localeEmploye.password);
    isNewEmployee && formData.append("email", localeEmploye.email);
    formData.append("role", localeEmploye.role);
    const id = editProfile ? "" : localeEmploye.id;
    isNewEmployee ? createEmployee(formData) : editEmployee(formData, id);
  };

  const validateFormat = (e) => {
    const { files } = e.target;
    if (!/\.(jpeg|jpg|png|svg|JPG|PNG|SVG)$/i.test(files[0].name)) {
      alerts.error(
        "invalid image extension",
        "allowed extensions |jpeg|jpg|png|"
      );
      e.target.value = "";
    } else {
      setimagePreview(URL.createObjectURL(files[0]));
      setimage(files);
    }
  };

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("employee"));
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setOptions(headers);
    listEmployees(headers);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Nav
        seteditProfile={seteditProfile}
        setlocaleEmploye={setlocaleEmploye}
        setimagePreview={setimagePreview}
        setisNewEmployee={setisNewEmployee}
      />
      <div className="container p-1">
        <h2 className="text-center mt-3">EMPLOYEES</h2>
        <button
          className="btn bg-dark text-light mb-2 shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalEmployee"
          onClick={() => {
            setimagePreview("");
            setlocaleEmploye({ ...initialState, password: "" });
            setimage([]);
            setisNewEmployee(true);
          }}
        >
          <i className="fas fa-user-plus"></i> Create employe
        </button>
        <div className="row card-dek p-3 shadow-lg p-3 mb-5 bg-body rounded ">
          {employees.map((elemt) => (
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-4 p-3"
              key={elemt._id}
            >
              <div className="card h-100 overflow-hidden shadow bg-body rounded">
                <div className="d-flex align-items-center">
                  <div className=" d-flex justify-content-center p-3">
                    <img
                      src={elemt.image ? elemt.image : defaultUser}
                      alt={elemt.imageName}
                      height={70}
                      width={70}
                      className="rounded-circle mt-1 shadow"
                    />
                  </div>
                  <hr className="m-0 mt-2" />
                  <div className="card-body">
                    <p className="card-tex m-0">{elemt.name.toUpperCase()}</p>
                    <p className="card-tex m-0 text-muted">
                      <i className="far fa-envelope"></i> {elemt.email}
                    </p>
                    <p className="card-tex m-0">
                      <i className="fas fa-phone-alt"></i> {elemt.contact}
                    </p>
                    <p className="card-tex m-0">
                      <i className="far fa-address-card"> </i> {elemt.address}
                    </p>
                    <p className="card-tex m-0">
                      <i className="fas fa-user-tag"></i> {elemt.role}
                    </p>
                    {elemt._id != employee.id && (
                      <div className="d-flex w-100 mt-2">
                        <i
                          className="fas fa-trash-alt me-4"
                          onClick={() => {
                            deleteEmployee(elemt._id);
                          }}
                        ></i>
                        <i
                          className="fas fa-user-edit me-4"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEmployee"
                          onClick={() => {
                            setisNewEmployee(false);
                            seteditProfile(false);
                            setisNewEmployee(false);
                            const {
                              _id: id,
                              createdAt,
                              updatedAt,
                              ...rest
                            } = elemt;
                            setimagePreview(elemt.image);
                            setlocaleEmploye({
                              ...rest,
                              id,
                            });
                          }}
                        ></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mb-3 d-flex justify-content-end">
            <Pagination
              current={page}
              total={totalData + 1}
              PageSize={pageSize}
              onChange={onChangePage}
            />
          </div>
        </div>
      </div>
      {/* Modal */}
      <>
        <div
          className="modal fade"
          id="modalEmployee"
          tabIndex={-1}
          aria-labelledby="modalEmployeeLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" style={{ maxWidth: 700 }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalEmployeeLabel">
                  {isNewEmployee
                    ? "Create employee"
                    : editProfile
                    ? "My profile"
                    : "Edit employee"}
                </h5>
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="close-modal-employee"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-5 d-flex justify-content-center aling-items-center py-3">
                    <img
                      src={imagePreview ? imagePreview : defaultUser}
                      alt="imagen"
                      className="rounded-circle"
                      height={200}
                      width={200}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 text-black">
                    <form onSubmit={action} className="needs-validation">
                      <div className="form-floating mb-2">
                        <input
                          type="text"
                          className="form-control"
                          required={true}
                          placeholder="Name"
                          id="floatingNameEmployee"
                          value={localeEmploye.name}
                          onChange={(e) => {
                            setlocaleEmploye({
                              ...localeEmploye,
                              name: e.target.value,
                            });
                          }}
                        />
                        <label
                          htmlFor="floatingNameEmployee"
                          className="form-label text-muted"
                        >
                          Name
                        </label>
                      </div>
                      <div className="form-floating mb-2">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Cel phone"
                          required={true}
                          id="floatingContactEmployee"
                          value={localeEmploye.contact}
                          onChange={(e) => {
                            setlocaleEmploye({
                              ...localeEmploye,
                              contact: e.target.value,
                            });
                          }}
                        />
                        <label
                          htmlFor="floatingContactEmployee"
                          className="form-label text-muted"
                        >
                          Cel phone
                        </label>
                      </div>
                      <div className="form-floating mb-2">
                        <input
                          id="floatingEmailEmployee"
                          type="email"
                          className="form-control form-control-lg"
                          required={true}
                          placeholder="Email address"
                          disabled={!isNewEmployee}
                          value={localeEmploye.email}
                          onChange={(e) => {
                            setlocaleEmploye({
                              ...localeEmploye,
                              email: e.target.value,
                            });
                          }}
                        />
                        <label
                          htmlFor="floatingEmailEmployee"
                          className="form-label text-muted"
                        >
                          Email address
                        </label>
                      </div>
                      <div className="form-floating mb-2">
                        <input
                          id="floatingAddressEmployee"
                          type="text"
                          className="form-control form-control-lg"
                          required={true}
                          placeholder="Address"
                          value={localeEmploye.address}
                          onChange={(e) => {
                            setlocaleEmploye({
                              ...localeEmploye,
                              address: e.target.value,
                            });
                          }}
                        />
                        <label
                          htmlFor="floatingAddressEmployee"
                          className="form-label text-muted"
                        >
                          Address
                        </label>
                      </div>
                      <div className="mb-2 form-floating">
                        <select
                          className="form-select form-control"
                          id="floatingSelectRole"
                          aria-label="Floating label"
                          disabled={editProfile || !isNewEmployee}
                          value={localeEmploye.role}
                          onChange={(e) => {
                            setlocaleEmploye({
                              ...localeEmploye,
                              role: e.target.value,
                            });
                          }}
                        >
                          <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                          <option value="SELLER">SELLER</option>
                          <option value="HUMAN RESOURCES">
                            HUMAN RESOURCES
                          </option>
                          <option value="WAREHOUSEMAN">WAREHOUSEMAN</option>
                        </select>
                        <label htmlFor="floatingSelectRole">Role</label>
                      </div>
                      {isNewEmployee && (
                        <div className="form-floating mb-2 has-validation">
                          <input
                            id="floatingPasswordEmployee"
                            type="password"
                            className="form-control form-control-lg"
                            required={true}
                            placeholder="Password"
                            value={localeEmploye.password}
                            pattern="(?=.*\d)(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            onChange={(e) => {
                              setlocaleEmploye({
                                ...localeEmploye,
                                password: e.target.value,
                              });
                            }}
                          />
                          <label
                            htmlFor="floatingPasswordEmployee"
                            className="form-label text-muted"
                          >
                            Password
                          </label>
                          The password must have a minimum of 8 characters,
                          letters, numbers and special characters.
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Image
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          placeholder="Image"
                          onChange={validateFormat}
                        />
                      </div>
                      <button
                        className="btn btn-dark btn-lg btn-block form-control"
                        type="submit"
                      >
                        {isNewEmployee ? "Create employee" : "Edit"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
