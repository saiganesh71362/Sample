import React, { useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../Models/IUsers";
import { UserManagementService } from "../../Services/UserManagmentService";
import "./Registration.css";
// top up
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration: React.FC = () => {
  // topup
  const notify = () =>
    toast.warning("Register Account SuccessFully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [user, setUser] = useState<IUser>({
    fullName: "",
    email: "",
    mobileNumber: 0,
    ssn: 0,
    dateOfBirth: "",
    gender: "",
    createdBy: "",
    updatedBy: "",
    accStatus: "",
  });

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
    UserManagementService.addUser(user)
      .then((response) => {
        if (response && response.data) {
          navigate("/active");
        }
      })
      .catch((error) => alert("Error Occurred" + error.message));
  };
  return (
    <>
      <NavbarMain></NavbarMain>
      {/* <pre>{JSON.stringify(user)}</pre> */}
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

      <div className="container">
        {/* header row-1 */}
        <div className="row mt-5">
          <div className="col-sm-2"> </div>
          <div className="col-sm-8">
            <div className="card">
              <div className="card-header  " id="Card-Header">
                <h1 className="text text-center text-dark">Register</h1>
              </div>
              <div className="card-body " id="Card-Body">
                {/* ----------form start----------- */}
                <form
                  onSubmit={(e) => {
                    onSubmitForm(e);
                  }}
                  className="Login-form"
                >
                  {/* --------------- form row-1 -------------*/}
                  <div className="row">
                    {/* column-1 */}
                    <div className="col-sm-6">
                      <label className="form-label fw-bold">Full Name :</label>
                      <input
                        name="fullName"
                        value={user.fullName}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                    {/* column-2 */}
                    <div className="col-sm-6">
                      <label className="form-label fw-bold">Email :</label>
                      <input
                        name="email"
                        value={user.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  {/* -------------------- form row-2----------------- */}
                  <div className="row mt-3">
                    {/* column-1 */}
                    <div className="col-sm-6">
                      <label className="form-label fw-bold">
                        Mobile Number :
                      </label>
                      <input
                        name="mobileNumber"
                        value={user.mobileNumber}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                    {/* column-2 */}
                    <div className="col-sm-6 fw-bold">
                      <label className="form-label">ssn :</label>
                      <input
                        name="ssn"
                        value={user.ssn}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  {/*------------------ form row-3------------------ */}
                  <div className="row mt-3 fw-bold">
                    {/* column-1 */}
                    <div className="col-sm-6">
                      <label className="form-label">Date Of Birth :</label>
                      <input
                        name="dateOfBirth"
                        value={user.dateOfBirth}
                        onChange={updateInput}
                        type="date"
                        className="form-control"
                        required
                      />
                    </div>
                    {/* column-2 */}
                    <div className="col-sm-6 fw-bold">
                      <label className="form-label">Gender :</label>
                      <div className="">
                        <div className="form-check-inline">
                          <input
                            value={"Male"}
                            onChange={updateInput}
                            type="radio"
                            className="form-check-input"
                            name="gender"
                            required
                          />{" "}
                          <label className="form-label fw-bold">Male</label>
                        </div>
                        <div className="form-check-inline">
                          <input
                            value={"Female"}
                            onChange={updateInput}
                            type="radio"
                            className="form-check-input"
                            name="gender"
                            required
                          />{" "}
                          <label className="form-label fw-bold">Female</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ---------------- form row-4------------ */}
                  <div className="row m-3">
                    <div className="col-sm-12 d-flex flex-row justify-content-between">
                      {/* div-1 */}
                      <div className="">
                        <button
                          type="submit"
                          className="btn btn-danger text-center fw-bold"
                          onClick={notify}
                        >
                          Submit
                        </button>
                        {/* <Link className="fw-bold" to={"/active"}>
                          Activate
                        </Link> */}

                        {/* <Link className="btn btn-success m-2" to={"/"}>
                          Home
                        </Link>
                        <Link className="btn btn-danger m-2" to={"/active"}>
                          Active
                        </Link> */}
                      </div>
                      {/* div-2 */}
                      <div className="text fw-bold">
                        <p>
                          If You Have A Account ?{" "}
                          <Link className="fw-bold" to={"/login"}>
                            Login Here:
                          </Link>
                        </p>
                      </div>
                    </div>
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

export default Registration;
