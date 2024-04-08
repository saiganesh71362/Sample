import React, { useEffect, useState } from "react";
import { PlasnServices } from "../../Services/Service";
import { IPlans } from "../../Models/IPlans";
import { Link } from "react-router-dom";
import { IPlanCategory } from "../../Models/IPlanCategory";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
//info

const ViewPlans: React.FC = () => {
  const [plansData, setPlansData] = React.useState<IPlans[]>([]);

  const [cat, setCat] = useState<IPlanCategory[]>([]);

  useEffect(() => {
    PlasnServices.getAllPlans()
      .then((response) => {
        setPlansData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    PlasnServices.getAllCategories()
      .then((response) => {
        setCat(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <NavbarMain></NavbarMain>

      <div
        className="container mt-5 "
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {/* information card   and row-1*/}
        <div className="row mt-5">
          <div className="col-sm-12">
            <div className="card  text-dark shadow-lg" id="Report-Header">
              <div className="card-body text-center fw-bold">
                <h2>VIEW PLAN'S</h2>
              </div>
            </div>
          </div>
        </div>
        {/* row-2   table information */}
        <div className="row mt-5">
          <div className="col-sm-12">
            <table className="table table-striped table-hover">
              {/* table head */}
              <thead className="table table-warning">
                <tr>
                  <th>S.No</th>
                  <th>Plan Name</th>
                  <th>Plan Start Date</th>
                  <th>Plan End Date</th>
                  <th>Plan Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Action</th> {/* Corrected: Added Action column header */}
                </tr>
              </thead>
              {/* table body */}
              <tbody className="" id="Report-Header">
                {plansData &&
                  plansData.map((plan, index) => {
                    return (
                      <tr key={index}>
                        <td>{plan.planId}</td>
                        <td>{plan.planName}</td>
                        <td>{plan.planStartDate}</td>
                        <td>{plan.planEndDate}</td>
                        <td>
                          {cat.map((value) => {
                            if (value.categoryId == plan.planCatagiryId) {
                              return value.categoryName;
                            }
                          })}
                        </td>
                        <td>
                          <Link
                            to={`/update-plan/${plan.planId}`}
                            className="btn btn-primary"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/delete-plan/${plan.planId}`}
                            className="btn btn-danger"
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </Link>
                        </td>
                        <td>
                          {plan.activeSwitch == null && (
                            <Link
                              to={`/active-plan/${plan.planId}/${plan.activeSwitch}`}
                              className="btn btn-secondary"
                            >
                              <i className="bi bi-circle">
                                {/* <pre>{JSON.stringify(plan.activeSwitch)}</pre> */}
                              </i>
                            </Link>
                          )}

                          {plan.activeSwitch == "Y" && (
                            <Link
                              to={`/active-plan/${plan.planId}/${plan.activeSwitch}`}
                              className="btn btn-danger"
                            >
                              <i className="bi bi-check-circle"></i>
                            </Link>
                          )}
                          {plan.activeSwitch == "N" && (
                            <Link
                              to={`/active-plan/${plan.planId}/${plan.activeSwitch}`}
                              className="btn btn-success"
                            >
                              <i className="bi bi-x-circle-fill"></i>
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* back-button */}
        <div>
          <a
            href="/create-plan"
            className="btn btn-warning mt-4 text-dark fw-bold"
          >
            {/* Avoid using empty href */}
            <i className="bi bi-arrow-left-square"></i> CreatePlan
          </a>
        </div>
      </div>
    </>
  );
};

export default ViewPlans;
