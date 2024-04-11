import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { ApplicationRegisterService } from "../../services/ApplicationRegisterService";
import { IApplicationRegisterEntity } from "../../models/IApplicationRegisterEntity";
import { IApplicationRegister } from "../../models/IApplicationRegister";

interface IState {
  applicationsData: IApplicationRegisterEntity[];
  error: string;
}

const ViewApplication: React.FC = () => {
  const [state, setState] = useState<IState>({
    applicationsData: [] as IApplicationRegisterEntity[],
    error: "",
  });
  useEffect(() => {
    ApplicationRegisterService.getAllApplicationRegisters()
      .then((response) => {
        // Cast each item to IApplicationRegisterEntity
        const applicationsData: IApplicationRegisterEntity[] =
          response.data.map((item: IApplicationRegister) => ({
            ...item,
            stateName: "", // Add default values for additional properties if needed
            createdDate: "",
            updatedDate: "",
            createdBy: "",
            updatedBy: "",
          }));
        setState({ ...state, applicationsData });
      })
      .catch((error) => {
        setState({ ...state, error: "Error fetching data" });
        console.log("Error fetching data", error);
      });
  }, []);
  const { applicationsData } = state;
  return (
    <>
      <div id="Body">
        <NavbarMain />
        {/* <pre>{JSON.stringify(accountData)}</pre> */}
        <div
          className="container mt-5"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <div className="row mt-5">
            <div className="col-sm-12">
              <div className="card text-light shadow-lg" id="CreateAp_Head">
                <div className="card-body text-center">
                  <h2>VIEW APPLICATIONS</h2>
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
                  </tr>
                </thead>
                <tbody>
                  {applicationsData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.appId}</td>
                      <td>{data.fullName}</td>
                      <td>{data.email}</td>
                      <td>{data.phNo}</td>
                      <td>{data.ssn}</td>
                      <td>{data.dob}</td>
                      <td>{data.gender}</td>
                      <td>
                        <Link
                          to={`/updateApplication/${data.appId}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/deleteApplication/${data.appId}`}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <Link
              to="/createApplication"
              className="btn btn-info mt-4 text-dark fw-bold"
            >
              <i className="bi bi-arrow-left-square"></i>
              {"  "}CreateApplication
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewApplication;
