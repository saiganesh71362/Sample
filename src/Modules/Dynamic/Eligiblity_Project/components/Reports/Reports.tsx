import React, { useEffect, useState } from "react";
import { EligibilityService } from "../../Services/EligibilityService";
import { ISearchRequest } from "../../Models/SearchRequest";
import { ISearchResponse } from "../../Models/SearchResponse";
import "./Reports.css";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IState {
  planNamesData: string[];
  planStatusData: string[];
  errorMsg: string;
  plansData: ISearchResponse[];
}
const Reports: React.FC = () => {
  // topup
  const notify = () =>
    toast.info("Show Reports", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notify1 = () =>
    toast.success("Download Pdf", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notify2 = () =>
    toast.success("Download Excel", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [state, setState] = useState<IState>({
    planNamesData: [],
    planStatusData: [],
    errorMsg: "",
    plansData: [],
  });
  useEffect(() => {
    EligibilityService.getAllUniquePlans()
      .then((response) => {
        setState({ ...state, planNamesData: response.data });
      })
      .catch((error) => {
        setState({ ...state, errorMsg: `Error! ${error}` });
      });
  });
  useEffect(() => {
    EligibilityService.getAllUniqueStatus()
      .then((response) => {
        setState({ ...state, planStatusData: response.data });
      })
      .catch((error) => {
        setState({ ...state, errorMsg: `Error! ${error}` });
      });
  });
  // -------------------- 2nd Logic---------------------------
  const [plan, setPlan] = useState<ISearchRequest>({
    planName: "",
    planStatus: "",
    planStartDate: "",
    planEndDate: "",
  });
  const updateInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    EligibilityService.searchRecord(plan)
      .then((response) => {
        setState({ ...state, plansData: response.data });
      })
      .catch((error) => {
        setState({ ...state, errorMsg: `Error! ${error}` });
      });
  };
  // ------------------------ Download Pdf--------------------------------
  const downloadPdf = () => {
    fetch("http://localhost:8083/eligibility/pdf")
      .then((response) => {
        return response.blob(); // Return the blob promise
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        setState({ ...state, errorMsg: `Error! ${error}` });
      });
  };
  // -------------------  Dowonlad Excel -----------------
  const downloadExcel = () => {
    fetch("http://localhost:8083/eligibility/excel")
      .then((response) => {
        return response.blob(); // Return the blob promise
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.xls";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        setState({ ...state, errorMsg: `Error! ${error}` });
      });
  };

  return (
    <>
      <nav className="navbar-container">
        <NavbarMain></NavbarMain>
      </nav>
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

      <div className="page">
        {/* <pre>{JSON.stringify(state.planNamesData)}</pre>
      <pre>{JSON.stringify(state.planStatusData)}</pre> */}
        {/* <pre>{JSON.stringify(state.plansData)}</pre>
        <pre>{JSON.stringify(plan)}</pre> */}
        <div
          className="container"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          {/* ------------------------Row-1  header--------------------------- */}
          <div className="row mt-4">
            <div className="card bg-warning shadow-lg" id="Report-Header">
              <div className="card-body text text-center">
                <h1 className="text-dark">REPORTS</h1>
              </div>
            </div>
          </div>
          {/* ----------------------------Row-2  input fields and table----------------------- */}
          <div className="row mt-5 ">
            <div className="card shadow-lg">
              <div className="card-body" id="Report-Header">
                {/* -------------form------- */}
                <form
                  onSubmit={(e) => {
                    onSubmitForm(e);
                  }}
                >
                  <div className="row">
                    {/* ------------col-1--------------- */}
                    <div className="col-sm-2">
                      <label htmlFor="" className="form-label fw-bold">
                        Plan Name
                      </label>
                      <select
                        className="form-select fw-bold"
                        name="planName"
                        value={plan.planName}
                        onChange={updateInput}
                      >
                        <option className="fw-bold" value="one" selected>
                          Select Names
                        </option>
                        {state.planNamesData.map((item, index) => {
                          return (
                            <option
                              className="fw-bold"
                              key={index}
                              value={item}
                            >
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* -----------col-2------------ */}
                    <div className="col-sm-2 fw-bold">
                      <label htmlFor="" className="form-label">
                        Plan Status
                      </label>
                      <select
                        className="form-select fw-bold"
                        name="planStatus"
                        value={plan.planStatus}
                        onChange={updateInput}
                      >
                        <option className="fw-bold" value="" selected>
                          Select Status
                        </option>
                        {state.planStatusData.map((item, index) => {
                          return (
                            <option
                              className="fw-bold"
                              value={item}
                              key={index}
                            >
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* ------------------col-3---------------- */}
                    <div className="col-sm-2 fw-bold">
                      <label htmlFor="" className="form-label">
                        PlanStartedDate
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="planStartDate"
                        value={plan.planStartDate}
                        onChange={updateInput}
                      />
                    </div>
                    {/* ----------------------col-4---------------- */}
                    <div className="col-sm-2 fw-bold">
                      <label htmlFor="" className="form-label">
                        PlanEndDate
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="planEndDate"
                        value={plan.planEndDate}
                        onChange={updateInput}
                      />
                    </div>
                    {/* ---------------------- col-5----------------------- */}
                    <div className="col-sm-2 fw-bold">
                      <input
                        type="submit"
                        value={"Search"}
                        className="btn btn-danger text text-white mt-4 ms-4 fw-bold"
                        onClick={notify}
                      />
                    </div>
                  </div>
                </form>
                {state.plansData.length > 0 && (
                  <table className="table table-striped table-hover mt-5">
                    <thead className="table table-dark">
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Gender</th>
                        <th>Ssn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.plansData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.elId}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td>{item.gender}</td>
                            <td>{item.ssn}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {/* --------------------- Row -3 Button----------- ---------------*/}
          <div className="row mt-4">
            <div className="col-sm-12 fw-bold">
              <button
                onClick={() => {
                  downloadPdf();
                  notify1();
                }}
                className="btn btn-primary fw-bold me-5"
              >
                Download Pdf
              </button>
              <button
                onClick={() => {
                  downloadExcel();
                  notify2();
                }}
                className="btn btn-primary fw-bold"
              >
                Download Excel
              </button>
            </div>
          </div>
          {/* ---------------- Row-4 Home---------- */}
          <div>
            <a
              href="/dashboard"
              className="btn btn-secondary mt-4 text-white fw-bold"
            >
              <i className="bi bi-arrow-left-square fw-bold"></i> DashBoard
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
