import React, { useEffect } from "react";
import "./DeletePlan.css";
import { useNavigate, useParams } from "react-router-dom";
import { PlasnServices } from "../../Services/Service";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeletePlan: React.FC = () => {
  const { planId } = useParams();
  const id = Number(planId);

  const navigate = useNavigate();

  useEffect(() => {
    PlasnServices.deletePlan(id)
      .then((response) => {
        if (response.data) {
          navigate("/view-plans");
          notify(); // Call notify function to show the toast
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, navigate]);

  const notify = () =>
    toast.success("Plan deleted successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // toastClassName: "bounce",
    });

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
