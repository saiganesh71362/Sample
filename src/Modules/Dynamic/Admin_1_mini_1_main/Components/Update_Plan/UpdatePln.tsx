import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPlanCategory } from "../../Models/IPlanCategory";
import { PlasnServices } from "../../Services/Service";
import { IPlans } from "../../Models/IPlans";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import "./UpdataPlan.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IState {
  categoryData: IPlanCategory[];
  errorMsg: string;
}

const UpdatePln: React.FC = () => {
  // topup
  const notify = () =>
    toast.info("Update Plan SuccessFully", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const { planId } = useParams();
  const id = Number(planId);

  const navigate = useNavigate();

  const [state, setState] = useState<IState>({
    categoryData: [] as IPlanCategory[],
    errorMsg: "",
  });

  useEffect(() => {
    PlasnServices.getAllCategories()
      .then((response) => {
        setState({ ...state, categoryData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    // stored the data page reload time
    PlasnServices.getPlanById(id)
      .then((response) => {
        setPlan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 2nd
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
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    PlasnServices.updatePlan(id, plan)
      .then((response) => {
        if (response.data) {
          navigate("/view-plans"); // Corrected navigation path
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavbarMain></NavbarMain>
      {/* <pre>{JSON.stringify(plan)}</pre> */}
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
          <div className="col-sm-12">
            <div className="card  text-dark shadow-lg" id="Report-Header">
              <div className="card-body text-center fw-bold">
                <h2>UPDATE PLAN</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-12">
            <div className="card" id="Report-Header">
              <div className="card-body">
                <form onSubmit={onSubmitForm}>
                  <div className="row">
                    <div className="col-sm-6">
                      <label
                        htmlFor="planName"
                        className="mb-3 form-label fw-bold"
                      >
                        Plan Name:
                      </label>
                      <input
                        name="planName"
                        value={plan.planName}
                        onChange={updateInput}
                        type="text"
                        placeholder="Enter your plan name"
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-6">
                      <label
                        htmlFor="planStartDate"
                        className="mb-3 form-label fw-bold"
                      >
                        Plan Start Date:
                      </label>
                      <input
                        name="planStartDate"
                        value={plan.planStartDate}
                        onChange={updateInput}
                        type="date"
                        placeholder=""
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <label
                        htmlFor="planEndDate"
                        className="mt-3 form-label fw-bold"
                      >
                        Plan End Date:
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
                    <div className="col-sm-6">
                      <label
                        htmlFor="planCategoryId"
                        className="mt-3 form-label fw-bold"
                      >
                        Plan Categories:
                      </label>
                      <select
                        className="form-select fw-bold text-danger"
                        name="planCatagiryId"
                        onChange={(e) => {
                          updateInput(e);
                        }}
                      >
                        <option className="fw fw-bold text-danger">
                          Choose Category
                        </option>
                        {state.categoryData.map((item, index) => (
                          <option
                            className="fw-bold"
                            key={index}
                            value={item.categoryId}
                          >
                            {item.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="" id="Update-Button">
                    <input
                      type="submit"
                      value="Update"
                      className="btn btn-primary mt-4 fw fw-bold"
                      id="Update-Button"
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
            href="/view-plans"
            className="  btn btn-info mt-4 text-dark fw-bold"
          >
            <i className="bi bi-eye-fill text text-dark"></i> ViewPlans
          </a>
        </div>
      </div>
    </>
  );
};

export default UpdatePln;
