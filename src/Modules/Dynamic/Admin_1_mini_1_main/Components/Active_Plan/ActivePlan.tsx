import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PlasnServices } from "../../Services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivePlan: React.FC = () => {
  const notify = () =>
    toast.success("Plan Status Changed successfully!", {
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

  const { planId } = useParams();
  let { status } = useParams();
  const id = Number(planId);
  const navigate = useNavigate();

  useEffect(() => {
    if (status == null) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      status = "Y";
    } else if (status == "Y") {
      status = "N";
    } else {
      status = "Y";
    }

    PlasnServices.updateStatus(id, status)
      .then((response) => {
        if (response.data) {
          navigate("/view-plans");
          notify();
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {JSON.stringify(status)}
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
    </>
  );
};

export default ActivePlan;
