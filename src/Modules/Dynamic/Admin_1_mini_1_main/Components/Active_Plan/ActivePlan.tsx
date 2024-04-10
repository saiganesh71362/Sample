import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PlasnServices } from "../../Services/Service";
import { toast } from "react-toastify";

const ActivePlan: React.FC = () => {
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
          toast.warning("Plan Status Updated Successfully");
          navigate("/view-plans");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <>{JSON.stringify(status)}</>;
};

export default ActivePlan;
