import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import "./UpdateAccount.css";
import { UserManagementService } from "../../Services/UserManagmentService";
import { IUser } from "../../Models/IUsers";
import { toast } from "react-toastify";
// topup

const UpdateAccount: React.FC = () => {
  const { userId } = useParams();
  const id = Number(userId);
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({
    email: "",
    mobileNumber: 0,
    gender: "",
    dateOfBirth: "",
    ssn: 0,
    createdBy: "",
    updatedBy: "",
    fullName: "",
    accStatus: "",
  });

  useEffect(() => {
    // stored the data page reload time
    UserManagementService.getUserById(id)
      .then((response) => {
        setUser(response.data);
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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserManagementService.updateUser(id, user) // Pass userId and user data to updateUser function
      .then((response) => {
        if (response.data) {
          toast.success("Account Updated Successfully");
          navigate("/viewAccounts"); // Corrected navigation path
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavbarMain></NavbarMain>

      <pre>{JSON.stringify(user)}</pre>

      <div className="container">
        {/* header row-1 */}
        <div className="row mt-5">
          <div className="col-sm-2"> </div>
          <div className="col-sm-8">
            <div className="card">
              <div className="card-header " id="Update-Header">
                <h1 className="text text-center text-white">Update Account</h1>
              </div>
              <div className="card-body bg-danger-subtle" id="Update-Body">
                {/* ----------form start----------- */}
                <form onSubmit={onSubmitForm}>
                  {/* --------------- form row-1 -------------*/}
                  <div className="row">
                    {/* column-1 */}
                    <div className="col-sm-6">
                      <label className="form-label fw-bold">Full Name :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={user.fullName}
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
                        value={user.email}
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
                        value={user.mobileNumber}
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
                        value={user.ssn}
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
                        value={user.dateOfBirth}
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
                            checked={user.gender === "Male"}
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
                            checked={user.gender === "Female"}
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
                          to={"/viewAccounts"}
                        >
                          ViewAccounts
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

export default UpdateAccount;
