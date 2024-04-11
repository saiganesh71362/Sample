import React, { useEffect, useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApplicationRegisterService } from "../../services/ApplicationRegisterService";

interface IState {
  error: string;
}

const DeleteApplication: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
  });
  const { appId } = useParams();
  const appid = Number(appId);
  const navigate = useNavigate();

  useEffect(() => {
    // Update state to indicate loading
    setState(() => ({
      ...state,
    }));

    // Call the service to delete user
    ApplicationRegisterService.deleteCitizen(appid)

      .then((response) => {
        console.log("Response from deleteUserById:", response);
        if (response.data) {
          // Update state to indicate loading has finished
          setState(() => ({
            ...state,
          }));
          // Redirect to viewAccounts page
          toast.error("Your Account Delete Success Fully");
          navigate("/viewApplication");
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
      <pre>{JSON.stringify(appid)}</pre>
    </>
  );
};

export default DeleteApplication;
