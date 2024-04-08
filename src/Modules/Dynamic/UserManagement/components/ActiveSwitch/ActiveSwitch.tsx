import React, { useEffect } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { UserManagementService } from "../../Services/UserManagmentService";
import { useParams, useNavigate } from "react-router-dom";

const ActiveSwitch: React.FC = () => {
  const { userId } = useParams();
  let { status } = useParams();
  const id = Number(userId);
  const navigate = useNavigate();

  // Assuming email is passed as a prop or accessible through context

  useEffect(() => {
    if (status == null) {
      status = "Y";
    } else if (status == "Y") {
      status = "N";
    } else {
      status = "Y";
    }

    UserManagementService.statusChange(id, status)
      .then((response) => {
        if (response.data) {
          navigate("/viewAccounts");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Added email to the dependency array

  return (
    <>
      <NavbarMain />
    </>
  );
};

export default ActiveSwitch;
