import React, { useEffect, useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import "./ViewAccounts.css";
import { UserManagementService } from "../../Services/UserManagmentService";
import { IUserMaster } from "../../Models/IUserMaster";
import { Link } from "react-router-dom";
interface IState {
  accountData: IUserMaster[];
  error: string;
  loading: boolean;
}

const ViewAccounts: React.FC = () => {
  const [state, setState] = useState<IState>({
    accountData: [] as IUserMaster[],
    error: "",
    loading: true,
  });
  useEffect(() => {
    UserManagementService.getAllUsers()
      .then((response) => {
        setState({ ...state, accountData: response.data });
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);
  const { accountData } = state;
  return (
    <>
      <NavbarMain />
      <div
        className="container mt-5"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="row mt-5">
          <div className="col-sm-12">
            <div className="card text-light shadow-lg" id="ViewAc-Header">
              <div className="card-body text-center">
                <h2>VIEW ACCOUNTS</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-12">
            <table className="table table-striped table-hover">
              <thead className="table-info">
                <tr>
                  <th>S.No</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>SSN</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accountData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.userId}</td>
                    <td>{data.fullName}</td>
                    <td>{data.email}</td>
                    <td>{data.mobile}</td>
                    <td>{data.ssn}</td>
                    <td>{data.date}</td>
                    <td>{data.gender}</td>
                    <td>
                      <Link
                        to={`/updateAccount/${data.userId}`}
                        className="btn btn-primary"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/deleteAccount/${data.userId}`}
                        className="btn btn-danger"
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Link>
                    </td>
                    <td>
                      {data.accStatus == null && (
                        <Link
                          to={`/active-plan/${data.userId}/${data.accStatus}`}
                          className="btn btn-secondary"
                        >
                          <i className="bi bi-circle">
                            {/* <pre>{JSON.stringify(plan.activeSwitch)}</pre> */}
                          </i>
                        </Link>
                      )}

                      {data.accStatus == "Y" && (
                        <Link
                          to={`/active-plan/${data.userId}/${data.accStatus}`}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-check-circle"></i>
                        </Link>
                      )}
                      {data.accStatus == "N" && (
                        <Link
                          to={`/active-plan/${data.userId}/${data.accStatus}`}
                          className="btn btn-success"
                        >
                          <i className="bi bi-x-circle-fill"></i>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Link to="/dashboard" className="btn btn-info mt-4 text-dark fw-bold">
            <i className="bi bi-arrow-left-square"></i> DashBoard
          </Link>
        </div>
      </div>
    </>
  );
};

export default ViewAccounts;
