import React, { useEffect } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { UserManagementService } from "../../Services/UserManagmentService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteAccount: React.FC = () => {
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

  const { userId } = useParams();
  const id = Number(userId);

  const navigate = useNavigate();
  useEffect(() => {
    UserManagementService.deleteUserById(id)
      .then((response) => {
        if (response.data) {
          navigate("/viewAccounts");
          notify();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }); // Empty dependency array

  return (
    <>
      <NavbarMain></NavbarMain>
      <pre>{JSON.stringify(id)}</pre>
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

export default DeleteAccount;
