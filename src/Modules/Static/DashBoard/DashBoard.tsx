import React from "react";
import { Link } from "react-router-dom";
import "./DashBoard.css";
import NavbarMain from "../../Utils/NavbarMain/NavbarMain";

const DashBoard: React.FC = () => {
  document.body.style.overflowY = "hidden";

  return (
    <>
      <NavbarMain></NavbarMain>
      <div id="body-home">
        <div id="homepage">
          <div id="text-page">
            <h1 className="text text-light">
              {"   "}
              <i className="bi bi-box-seam-fill text text-white"> </i>Welcome to
              DashBoard{"  "}
              <i className="bi bi-box-seam-fill text text-white"></i>
            </h1>
            <hr />
            <Link to="/create-plan">
              <button className="btn btn-success text text-white fw-bold">
                {"  "}
                Create A Plan{" "}
                <i className="bi bi-file-earmark-plus-fill text text-white"></i>
              </button>
            </Link>
            <Link to="/view-plans">
              <button className="btn btn-info text text-white ms-4 fw-bold">
                {"  "}
                View Plans <i className="bi bi-eye-fill text text-light"></i>
              </button>
            </Link>

            <hr></hr>
            <Link to="/reports">
              <button className="btn btn-danger fw-bold">
                Reports {"   "}{" "}
                <i className="bi bi-book-fill text text-white"></i>
              </button>
            </Link>
            <hr></hr>
            {/* <Link to="/login">
              <button className="btn btn-primary">
                Login {"  "}
                <i className="bi bi-box-arrow-in-right"></i>
              </button>
            </Link>
            <hr /> */}
            <Link to="/viewAccounts">
              <button className="btn btn-warning fw-bold">
                ViewAccounts
                <i className="bi bi-box-arrow-in-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
