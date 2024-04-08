import React, { useEffect, useState } from "react";
import { IPlanCategory } from "../../Models/IPlanCategory";
import { PlasnServices } from "../../Services/Service";
import { IPlans } from "../../Models/IPlans";
import { useNavigate } from "react-router-dom";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IState {
  categoryData: IPlanCategory[];
  errorMsg: string;
}
const CreatePlan: React.FC = () => {
  // topup
  const notify = () =>
    toast.success("Create Plan SuccessFully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [state, setState] = React.useState<IState>({
    categoryData: [] as IPlanCategory[],
    errorMsg: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    PlasnServices.getAllCategories()
      .then((response) => {
        // console.log(response);
        setState({ ...state, categoryData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }); // Empty dependency array if setState doesn't change

  const { categoryData } = state;

  const [plan, setPlan] = useState<IPlans>({
    planName: "",
    planStartDate: "",
    planEndDate: "",
    planCatagiryId: 0,
  });

  const updateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "categoryId") {
      setPlan({ ...plan, planCatagiryId: parseInt(e.target.value) });
    } else {
      setPlan({ ...plan, [e.target.name]: e.target.value });
    }
  };
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    PlasnServices.createNewPlan(plan)
      .then((response) => {
        if (response.data) {
          navigate("/view-plans");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <NavbarMain></NavbarMain>
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

      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-sm-12  ">
            <div className="card text-dark shadow-lg" id="Report-Header">
              <div className="card-body text-center " id="Create-Body">
                <h2 className=" fw-bold">CREATE PLAN</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-12">
            <div className="card" id="Report-Header">
              <div className="card-body" id="Create-Card">
                <form onSubmit={onSubmitForm}>
                  {" "}
                  {/* -----------row-1------------ */}
                  <div className="row">
                    {/* col-1 */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="PlanName"
                        className="mb-3 form-label fw-bold"
                      >
                        PlanName :
                      </label>
                      <input
                        name="planName"
                        value={plan.planName}
                        onChange={updateInput}
                        type="text"
                        placeholder="ENTER YOUR PLAN NAME "
                        className="form-control"
                      />
                    </div>
                    {/* col-2 */}
                    <div className="col-sm-6 fw-bold">
                      <label
                        htmlFor="PlanStartDate :"
                        className="mb-3 form-label fw-bold"
                      >
                        PlanStartDate
                      </label>
                      <input
                        name="planStartDate"
                        value={plan.planStartDate}
                        onChange={updateInput}
                        type="date"
                        placeholder=" "
                        className="form-control"
                      />
                    </div>
                  </div>
                  {/* ---------row-2 ---------*/}
                  <div className="row">
                    {/* col-1 */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="PlanEndDate :"
                        className="mt-3 form-label fw-bold"
                      >
                        PlanEndDate
                      </label>
                      <input
                        name="planEndDate"
                        value={plan.planEndDate}
                        onChange={updateInput}
                        type="date"
                        placeholder=""
                        className="form-control"
                      />
                    </div>
                    {/* col-2 */}
                    <div className="col-sm-6" key="categorySelect">
                      <label
                        htmlFor="Categories :"
                        className="mt-3 form-label fw-bold"
                      >
                        PlanCategories
                      </label>
                      <select
                        className="form-select text-info fw-bold"
                        name="categoryId"
                        onChange={updateInput}
                      >
                        <option selected className="text text-info fw-bold">
                          {" "}
                          Select a category{" "}
                        </option>
                        {categoryData.map((item, index) => (
                          <option
                            className="text text-info fw-bold"
                            key={index}
                            value={item.categoryId}
                          >
                            {item.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/*------------ row-3------------ */}
                  <div className="fw-bold">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary mt-4 fw-bold"
                      onClick={notify}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* back-button */}
        <div>
          <a
            href="/dashboard"
            className="btn btn-danger mt-4 text-white fw-bold"
          >
            <i className="bi bi-arrow-left-square fw-bold"></i> DashBoard
          </a>
        </div>
      </div>
      {/* <pre>{JSON.stringify(categoryData)}</pre> */}
    </>
  );
};

export default CreatePlan;
