import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { ApplicationRegisterService } from "../../services/ApplicationRegisterService";
import { toast } from "react-toastify";
import { IApplicationRegister } from "../../models/IApplicationRegister";

const UpdateApplication: React.FC = () => {
  const { appId } = useParams();
  const id = Number(appId);
  const navigate = useNavigate();

  const [applications, setApplication] = useState<IApplicationRegister>({
    fullName: "",
    email: "",
    phNo: 0,
    gender: "",
    ssn: 0,
    dob: "",
    appId: 0,
  });
  useEffect(() => {
    ApplicationRegisterService.getApplicationRegisterById(id)
      .then((response) => {
        // Assuming the response directly contains the application data
        setApplication(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const updateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setApplication({ ...applications, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ApplicationRegisterService.updateCitizen(id, applications) // Pass userId and user data to updateUser function
      .then((response) => {
        if (response.data) {
          toast.success("Application Updated Successfully");
          navigate("/ViewApplication"); // Corrected navigation path
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div id="Body">
        <NavbarMain></NavbarMain>
        <pre>{JSON.stringify(applications)}</pre>
        <div className="container">
          {/* header row-1 */}
          <div className="row mt-5">
            <div className="col-sm-2"> </div>
            <div className="col-sm-8">
              <div className="card">
                <div className="card-header " id="CreateAp_Head">
                  <h1 className="text text-center text-white">
                    Update Application
                  </h1>
                </div>
                <div className="card-body bg-danger-subtle" id="CreateAp_Head">
                  {/* ----------form start----------- */}
                  <form onSubmit={onSubmitForm}>
                    {/* --------------- form row-1 -------------*/}
                    <div className="row">
                      {/* column-1 */}
                      <div className="col-sm-6">
                        <label className="form-label fw-bold">
                          Full Name :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={applications.fullName}
                          onChange={updateInput}
                          required
                        />
                      </div>
                      {/* column-2 */}
                      <div className="col-sm-6 fw-bold">
                        <label className="form-label">Email :</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={applications.email}
                          onChange={updateInput}
                          required
                        />
                      </div>
                    </div>
                    {/* -------------------- form row-2----------------- */}
                    <div className="row mt-3 fw-bold">
                      {/* column-1 */}
                      <div className="col-sm-6">
                        <label className="form-label">Mobile Number :</label>
                        <input
                          type="text"
                          className="form-control"
                          name="mobileNumber"
                          value={applications.phNo}
                          onChange={updateInput}
                          required
                        />
                      </div>
                      {/* column-2 */}
                      <div className="col-sm-6 fw-bold">
                        <label className="form-label">Ssn :</label>
                        <input
                          type="text"
                          className="form-control"
                          name="ssn"
                          value={applications.ssn}
                          onChange={updateInput}
                          required
                        />
                      </div>
                    </div>
                    {/*------------------ form row-3------------------ */}
                    <div className="row mt-3 fw-bold">
                      {/* column-1 */}
                      <div className="col-sm-6 fw-bold">
                        <label className="form-label">Date Of Birth :</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
                          value={applications.dob}
                          onChange={updateInput}
                          required
                        />
                      </div>
                      {/* column-2 */}
                      <div className="col-sm-6 fw-bold">
                        <label className="form-label">Gender :</label>
                        <div className="">
                          <div className="form-check-inline">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="gender"
                              value="Male"
                              checked={applications.gender === "Male"}
                              onChange={updateInput}
                              required
                            />{" "}
                            <label className="form-label fw-bold">Male</label>
                          </div>
                          <div className="form-check-inline fw-bold">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="gender"
                              value="Female"
                              checked={applications.gender === "Female"}
                              onChange={updateInput}
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
                        <div className="">
                          <input
                            type="submit"
                            value={`Update`}
                            className="btn btn-primary m-2 fw-bold"
                          ></input>
                          <Link
                            className="btn btn-success m-2 fw-bold"
                            to={"/viewApplication"}
                          >
                            ViewApplications
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

export default UpdateApplication;
