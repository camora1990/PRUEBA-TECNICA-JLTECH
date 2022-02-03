import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useEmployee } from "../context/EmployeeContext";
import { Loading } from "./Loading";

export const Login = () => {
  const { loginEmployee, loading } = useEmployee();
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const login = (e) => {
    e.preventDefault();
    loginEmployee(credentials, history);
  };
  return (
    <>
      {loading && <Loading />}
      <section className="vh-100 bg-dark ">
        <div className="container  d-flex justify-content-center align-items-center h-100">
          <div className="row d-flex d-flex justify-content-center align-items-center w-100">
            <div className="col col-xl-10">
              <div
                className="card overflow-hidden border-0"
                style={{ borderRadius: 30 }}
              >
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://uplots.cl/wp-content/uploads/2021/03/Uplots23.jpg"
                      alt="imagen"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={login}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-poll fa-2x me-3"></i>
                          <span className="h1 fw-bold mb-0">
                            BUSINESS GROUP
                          </span>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3">
                          Sign into your account
                        </h5>
                        <div className="form-floating mb-3">
                          <input
                            id="floatingEmailLogin"
                            type="email"
                            className="form-control form-control-lg"
                            required={true}
                            placeholder="Email address"
                            value={credentials.email}
                            onChange={(e) =>
                              setCredentials({
                                ...credentials,
                                email: e.target.value,
                              })
                            }
                          />
                          <label
                            htmlFor="floatingEmailLogin"
                            className="form-label text-muted"
                          >
                            Email address
                          </label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            id="floatingPasswordLogin"
                            placeholder="Password"
                            value={credentials.password}
                            required={true}
                            onChange={(e) =>
                              setCredentials({
                                ...credentials,
                                password: e.target.value,
                              })
                            }
                          />
                          <label
                            htmlFor="floatingPasswordLogin"
                            className="form-label text-muted"
                          >
                            Password
                          </label>
                        </div>
                        <button
                          className="btn btn-dark btn-lg btn-block form-control"
                          type="submit"
                        >
                          Login
                        </button>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2 mt-5">
                          <a href="#!" className="small text-muted">
                            Terms of use.
                          </a>
                          <a href="#!" className="small text-muted">
                            Privacy policy
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
