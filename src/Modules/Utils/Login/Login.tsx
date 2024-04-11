import React, { useState } from "react";
import NavbarMain from "../NavbarMain/NavbarMain";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ILogin } from "../../Dynamic/UserManagement/Models/ILogin";
import { UserManagementService } from "../../Dynamic/UserManagement/Services/UserManagmentService";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [user, setUser] = useState<ILogin>({ email: "", password: "" });

  const updateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserManagementService.UserLogin(user)
      .then((response) => {
        if (response && response.data) {
          toast.success("User Login SuccessFully");
          navigate("/viewAccounts");
        }
      })
      .catch((error) => alert("Error Occurred: " + error.message));
  };

  // Apply CSS styles to prevent scrolling
  document.body.style.overflowY = "hidden";

  return (
    <>
      <div id="Body">
        <NavbarMain />
        <div className="" id="Login-Page">
          <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="card col-sm-6 shadow-lg">
                <h3
                  className="card-header text-center text-dark"
                  id="Card-Header"
                >
                  Login
                </h3>
                <div className="card-body bg bg-bg-gradient" id="Card-Body">
                  <form
                    onSubmit={(e) => {
                      onSubmitForm(e);
                    }}
                    action=""
                    className="Login-form"
                  >
                    <input
                      name="email"
                      value={user.email}
                      onChange={updateInput}
                      type="email"
                      className="form-control mt-4 col-sm-6"
                      placeholder="Enter Your Email"
                      required
                    />
                    <input
                      name="password"
                      value={user.password}
                      onChange={updateInput}
                      type="password"
                      className="form-control mt-4"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      placeholder="Enter Your Password"
                      required
                    />
                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-danger btn-block text-center fw-bold"
                      >
                        LogIn
                      </button>
                    </div>
                    <Link
                      to="/forgotPassword"
                      className="d-block mt-2 fw-fw-bold fs-5 text text-light fw-bold"
                    >
                      Forgot Password
                    </Link>
                    <div className="mt-2 text-end text-dark fw-bold">
                      Don't have an account?
                      <Link
                        to="/register"
                        className="fw-fw-bold fs-5 text text-dark ms-2 fw-bold"
                      >
                        Register
                      </Link>
                    </div>
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

export default Login;
