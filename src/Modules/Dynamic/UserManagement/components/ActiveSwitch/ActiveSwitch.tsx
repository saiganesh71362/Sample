import React, { useEffect, useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { UserManagementService } from "../../Services/UserManagmentService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IState {
  error: string;
}

const ActiveSwitch: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
  });
  const { userId, currentStatus } = useParams<{
    userId: string;
    currentStatus: string;
  }>();
  console.log(userId);
  console.log(currentStatus);
  const navigate = useNavigate();

  const toggleActiveStatus = (currentStatus: string | undefined) => {
    return currentStatus === "Active" ? "In-Active" : "Active";
  };

  useEffect(() => {
    const newStatus = toggleActiveStatus(currentStatus);
    const cid = Number(userId);
    setState((prevState) => ({
      ...prevState,
    }));
    currentStatus === "Active"
      ? toast.error("Your Account is De-Active")
      : toast.success("Your Account is Active");
    newStatus &&
      UserManagementService.statusChange(cid, newStatus)
        .then((response) => {
          if (response && response.data) {
            setState((prevState) => ({
              ...prevState,
            }));
            navigate("/ViewAccounts");
          }
        })
        .catch((error) => {
          setState((prevState) => ({
            ...prevState,
            error: error.message,
          }));
        });
  }, [userId, currentStatus, navigate]);

  return (
    <>
      <NavbarMain></NavbarMain>
      <pre>{JSON.stringify(state)}</pre>
      <h1>This ia a Active Switch Component</h1>
    </>
  );
};

export default ActiveSwitch;
