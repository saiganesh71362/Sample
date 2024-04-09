import React, { useEffect, useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { UserManagementService } from "../../Services/UserManagmentService";
import { useNavigate, useParams } from "react-router-dom";

interface IState {
  error: string;
}

const DeleteAccount: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
  });
  const { userId } = useParams();
  const cid = Number(userId);
  const navigate = useNavigate();

  useEffect(() => {
    // Update state to indicate loading
    setState(() => ({
      ...state,
    }));

    // Call the service to delete user
    UserManagementService.deleteUserById(cid)
      .then((response) => {
        console.log("Response from deleteUserById:", response);
        if (response.data) {
          // Update state to indicate loading has finished
          setState(() => ({
            ...state,
          }));
          // Redirect to viewAccounts page
          navigate("/viewAccounts");
        }
      })
      .catch((error) => {
        console.error("Error in deleteUserById:", error);
        // Update state with error message and indicate loading has finished
        setState(() => ({
          ...state,
          error: error.message,
        }));
      });
  }, []);
  return (
    <>
      <NavbarMain />
      <pre>{JSON.stringify(cid)}</pre>
    </>
  );
};

export default DeleteAccount;
