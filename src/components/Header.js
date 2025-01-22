import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/header.css";

export const Header = () => {
  return (
    <header className="site-header position-sticky top-0 left-0 w-100 bg-white z-3 shadow-sm">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="logo-wrap">
            <h2 className="playfair-display-semibold fs-30">WEF Nexus</h2>
          </div>
          <div className="menu-wrap">
            <ul className="list-unstyled d-flex mb-0">
              <li className="me-3">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active fs-16px open-sans-normal text-decoration-none fc-black" : "fs-16px open-sans-normal text-decoration-none fc-gray")}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/stakeholders"
                  className={({ isActive }) => (isActive ? "active fs-16px open-sans-normal text-decoration-none fc-black" : "fs-16px open-sans-normal text-decoration-none fc-gray")}
                >
                  Stakeholders
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
