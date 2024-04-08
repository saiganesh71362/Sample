import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { UserManagementService } from "../../Services/UserManagmentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IState {
  email: string;
  error: string;
}
const ForgotPassword: React.FC = () => {
  const notify = () =>
    toast.info("Update Account SuccessFully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [state, setState] = useState<IState>({ email: "", error: "" });

  const updateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserManagementService.forgotPwd(state.email)
      .then((response) => {
        if (response && response.data) {
          navigate("/login");
        }
      })
      .catch((error) => alert("Error Occurred" + error.message));
  };

  return (
    <>
      <NavbarMain></NavbarMain>
      {/* <pre>{JSON.stringify(state)}</pre> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bounce"
      />

      <div className="bg ">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card col-sm-6 shadow-lg">
              <h3
                className="card-header text-center text-dark"
                id="Card-Header"
              >
                Forgot Password
              </h3>
              <div className="card-body " id="Card-Body">
                <form
                  onSubmit={(e) => onSubmitForm(e)}
                  action=""
                  className="Login-form"
                >
                  <input
                    name="email"
                    value={state.email}
                    onChange={updateInput}
                    type="email"
                    className="form-control mt-4 col-sm-6"
                    placeholder="Registered Email"
                    required
                  />
                  <div className="d-grid gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block text-center fw-bold"
                      onClick={notify}
                    >
                      Recover Password
                    </button>
                  </div>
                  <div className="mt-2 text-end">
                    <Link
                      to="/login"
                      className="fw-fw-bold fs-5 text text-dark ms-2 fw-bold"
                    >
                      Sign In
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
