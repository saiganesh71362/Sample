import React from "react";

const NavbarMain: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            <i className="bi bi-hospital text text-danger fw-bold"></i>
            {"  "}Health
            <span className="text-warning fw-bold">Insurance</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item fw-bold">
                <a className="nav-link pe-4 fw-bold" href="/login">
                  <i className="bi bi-person-circle pe-2 text text-white fw-bold"></i>
                  Login
                </a>
              </li>
              <li className="nav-item fw-bold">
                <a className="nav-link fw-bold" href="/register">
                  <i className="bi bi-person-plus-fill pe-2 text text-white fw-bold"></i>
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarMain;
