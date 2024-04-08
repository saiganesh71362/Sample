import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "../../Utils/Navbar/Navbar";
import "./Home.css"; // Corrected import path for CSS file
import NavbarMain from "../../Utils/NavbarMain/NavbarMain";

const Home: React.FC = () => {
  document.body.style.overflowY = "hidden";

  return (
    <>
      <NavbarMain></NavbarMain>
      <div id="Home-Page" className="">
        <div id="homepage">
          <div id="text-page">
            <h1 className="text text-light">
              <i className="bi bi-flower1 text-white"></i> Welcome to
              Health-Insurance <i className="bi bi-flower1 text-white"></i>
            </h1>
            <hr />
            <Link to="/dashboard">
              <button className="btn btn-success text text-white">
                Goto DashBoard{"  "}
                <i className="bi bi-arrow-right-square text text-white"></i>
              </button>
            </Link>
            <hr />
            <Link to="/register">
              <button className="btn btn-danger fw-bold">Register</button>
            </Link>

            {/* <hr />
            <Link to="/create-plan">
              <button className="btn btn-warning"> Create A Plan</button>
            </Link>
            <hr></hr>
            <Link to="/reports">
              <button className="btn btn-danger">Reports</button>
            </Link>
            <hr></hr>
            <Link to="/login">
              <button className="btn btn-success">Login</button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
