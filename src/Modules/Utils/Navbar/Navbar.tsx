import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-md navbar-dark  bg-dark"
          aria-label="Main navigation"
        >
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active btn btn-primary "
                    aria-current="location"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/create-plan">
                    Create-Plan
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/view-plans">
                    View-Plan
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link active" href="/update-plan">
                    Update-Plan
                  </a>
                </li> */}

                {/* <li className="nav-item">
                  <a className="nav-link active" href="/delete-plan">
                    Delete-Plan
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
