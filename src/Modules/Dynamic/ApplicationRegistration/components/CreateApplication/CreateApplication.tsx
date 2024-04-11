import React, { useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import "./CreateApplication.css";
import { Link, useNavigate } from "react-router-dom";
import { IApplicationRegister } from "../../models/IApplicationRegister";
import { ApplicationRegisterService } from "../../services/ApplicationRegisterService";
import { toast } from "react-toastify";
const CreateApplication: React.FC = () => {
  const [application, setApplication] = useState<IApplicationRegister>({
    fullName: "",
    email: "",
    phNo: 0,
    ssn: 0,
    dob: "",
    gender: "",
    appId: 0,
  });

  const updateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ApplicationRegisterService.applicationRegister(application)

      .then((response) => {
        if (response && response.data) {
          toast.success("Application Register Successfully");
          navigate("/viewApplication");
        }
      })
      .catch((error) => alert("Error Occurred" + error.message));
  };

  return (
    <>
      <div id="Body">
        <NavbarMain></NavbarMain>
        <pre>{JSON.stringify(application)}</pre>
        <div className="container">
          {/* header row-1 */}
          <div className="row mt-5">
            <div className="col-sm-2"> </div>
            <div className="col-sm-8">
              <div className="card">
                <div className="card-header  " id="CreateAp_Head">
                  <h1 className="text text-center text-light">
                    Create Application
                  </h1>
                </div>
                <div className="card-body " id="CreateAp_Head">
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
                        <label className="form-label fw-bold text text-light">
                          Full Name :
                        </label>
                        <input
                          name="fullName"
                          value={application.fullName}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                      {/* column-2 */}
                      <div className="col-sm-6">
                        <label className="form-label fw-bold text text-light">
                          Email :
                        </label>
                        <input
                          name="email"
                          value={application.email}
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
                        <label className="form-label fw-bold text text-light">
                          Mobile Number :
                        </label>
                        <input
                          name="phNo"
                          value={application.phNo}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                      {/* column-2 */}
                      <div className="col-sm-6 fw-bold">
                        <label className="form-label text text-light">
                          ssn :
                        </label>
                        <input
                          name="ssn"
                          value={application.ssn}
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
                        <label className="form-label text text-light">
                          Date Of Birth :
                        </label>
                        <input
                          name="dob"
                          value={application.dob}
                          onChange={updateInput}
                          type="date"
                          className="form-control"
                          required
                        />
                      </div>
                      {/* column-2 */}
                      <div className="col-sm-6 fw-bold">
                        <label className="form-label text text-light">
                          Gender :
                        </label>
                        <div className="">
                          <div className="form-check-inline">
                            <input
                              value={"Male"}
                              type="radio"
                              className="form-check-input"
                              name="gender"
                              onChange={updateInput}
                              required
                            />{" "}
                            <label className="form-label fw-bold text text-light">
                              Male
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <input
                              value={"Female"}
                              type="radio"
                              className="form-check-input"
                              name="gender"
                              onChange={updateInput}
                              required
                            />{" "}
                            <label className="form-label fw-bold text text-light">
                              Female
                            </label>
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
                          >
                            Submit
                          </button>
                          <Link
                            className="ms-5 text text-light"
                            to="/viewApplication"
                          >
                            ViewAc
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
      </div>
    </>
  );
};

export default CreateApplication;
