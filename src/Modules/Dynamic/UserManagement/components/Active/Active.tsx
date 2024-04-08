import React, { useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { Link, useNavigate } from "react-router-dom";
import { IActiveAccounts } from "../../Models/IActiveAccount";
import { UserManagementService } from "../../Services/UserManagmentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Active: React.FC = () => {
  //topup
  const notify = () =>
    toast.info("Create Account SuccessFully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [user, setUser] = useState<IActiveAccounts>({
    email: "",
    newPassword: "",
    tempPassword: "",
    confirmPassword: "",
  });

  const updateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (user.newPassword !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Call the service to activate the account
      await UserManagementService.activateAccount(user);
      // If successful, navigate to login page
      navigate("/login");
    } catch (error) {
      alert("Error Occurred" + error);
    }
  };

  return (
    <>
      <NavbarMain></NavbarMain>
      <pre>{JSON.stringify(user)}</pre>
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
              <div className="card-header " id="Card-Header">
                <h1 className="text text-center text-dark">Active Account</h1>
              </div>
              <div className="card-body " id="Card-Body">
                {/* ----------form start----------- */}
                <form
                  onSubmit={(e) => {
                    onSubmitForm(e);
                  }}
                >
                  {/* --------------- form row-1 -------------*/}
                  <div className="row">
                    {/* column-1 */}
                    <div className="col-sm-6">
                      <label className="form-label fw-bold">
                        Register Email :
                      </label>
                      <input
                        name="email"
                        value={user.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        required
                      />
                    </div>
                    {/* column-2 */}
                    <div className="col-sm-6 fw-bold">
                      <label className="form-label">New Password :</label>
                      <input
                        name="newPassword"
                        value={user.newPassword}
                        onChange={updateInput}
                        type="password"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  {/* -------------------- form row-2----------------- */}
                  <div className="row mt-3 fw-bold">
                    {/* column-1 */}
                    <div className="col-sm-6">
                      <label className="form-label">Temporary Password :</label>
                      <input
                        name="tempPassword"
                        value={user.tempPassword}
                        onChange={updateInput}
                        type="password"
                        className="form-control"
                        required
                      />
                    </div>
                    {/* column-2 */}
                    <div className="col-sm-6 fw-bold">
                      <label className="form-label">Confirm Password :</label>
                      <input
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={updateInput}
                        type="password"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  {/* ---------------- form row-3------------ */}
                  <div className="row m-3">
                    <div className="col-sm-12 d-flex flex-row ">
                      {/* div-1 */}
                      <div className="">
                        <button
                          type="submit"
                          className="btn btn-primary text-center fw-bold"
                          onClick={notify}
                        >
                          Activate
                        </button>
                        <Link className="btn btn-danger m-2" to={"/register"}>
                          Register
                        </Link>
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

export default Active;
