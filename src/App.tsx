import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./Modules/Static/Home/Home";
import CreatePlan from "./Modules/Dynamic/Admin_1_mini_1_main/Components/Create_Plan/CreatePlan";
import UpdatePln from "./Modules/Dynamic/Admin_1_mini_1_main/Components/Update_Plan/UpdatePln";
import ViewPlans from "./Modules/Dynamic/Admin_1_mini_1_main/Components/View_Plan/ViewPlans";
import DeletePlan from "./Modules/Dynamic/Admin_1_mini_1_main/Components/Delete_Plan/DeletePlan";
import ActivePlan from "./Modules/Dynamic/Admin_1_mini_1_main/Components/Active_Plan/ActivePlan";
import Reports from "./Modules/Dynamic/Eligiblity_Project/components/Reports/Reports";
import Login from "./Modules/Utils/Login/Login";
import DashBoard from "./Modules/Static/DashBoard/DashBoard";
import Registration from "./Modules/Dynamic/UserManagement/components/Registration/Registration";
import Active from "./Modules/Dynamic/UserManagement/components/Active/Active";
import ForgotPassword from "./Modules/Dynamic/UserManagement/components/ForgotPassword/ForgotPassword";
import ViewAccounts from "./Modules/Dynamic/UserManagement/components/ViewAccounts/ViewAccounts";
import DeleteAccount from "./Modules/Dynamic/UserManagement/components/DeleteAccount/DeleteAccount";
import ActiveSwitch from "./Modules/Dynamic/UserManagement/components/ActiveSwitch/ActiveSwitch";
import UpdateAccount from "./Modules/Dynamic/UserManagement/components/UpdateAccount/UpdateAccount";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/create-plan" element={<CreatePlan />} />
          <Route path="/view-plans" element={<ViewPlans />} />
          <Route path="/update-plan/:planId" element={<UpdatePln />} />
          <Route path="/delete-plan/:planId" element={<DeletePlan />} />
          <Route
            path="/active-plan/:planId/:status?"
            element={<ActivePlan />}
          />
          {/* --------------Reports Module-2 -----------------*/}
          <Route path="/reports" element={<Reports />} />
          {/* -----------------mini-3-------------------- */}
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/forgotPassword"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route path="/active" element={<Active />}></Route>
          <Route path="/viewAccounts" element={<ViewAccounts />}></Route>
          <Route
            path="/updateAccount/:userId"
            element={<UpdateAccount />}
          ></Route>
          <Route
            path="/deleteAccount/:userId"
            element={<DeleteAccount />}
          ></Route>
          <Route
            path="/activeSwitch/:userId/:currentStatus"
            element={<ActiveSwitch />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
