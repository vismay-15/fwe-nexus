import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="site-header position-sticky top-0 left-0 w-100 bg-white z-3 shadow-sm">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="logo-wrap">
            <h2 className="playfair-display-semibold fs-30">FWE Nexus</h2>
          </div>
          <div className="menu-wrap ">
            <ul className="list-unstyled d-flex mb-0">
              <li className="me-3">
                <Link to="/" className="fs-16px fc-gray text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/stackholders"
                  className="fs-16px fc-gray text-decoration-none"
                >
                  Stackholders
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
