import React, { useEffect } from "react";
import "./DeletePlan.css";
import { useNavigate, useParams } from "react-router-dom";
import { PlasnServices } from "../../Services/Service";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { toast } from "react-toastify";

const DeletePlan: React.FC = () => {
  const { planId } = useParams();
  const id = Number(planId);

  const navigate = useNavigate();

  useEffect(() => {
    PlasnServices.deletePlan(id)
      .then((response) => {
        if (response.data) {
          toast.error("Plan Deleted Successfully");
          navigate("/view-plans");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, navigate]);

  return (
    <>
      <NavbarMain></NavbarMain>

      <h1>{JSON.stringify(id)}</h1>
    </>
  );
};

export default DeletePlan;
/* <Navbar></Navbar>
<div className="container">
  <div className="cont-body">
    <div className="centered">
      <Link to="/view-plans">
        <button id="but" className="btn btn-secondary mt-4 text-white">
          <i className="bi bi-arrow-left-square"></i> Back
        </button>
      </Link>
    </div>
  </div>
</div> */
