import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="site-footer">
    <div className="wrap" style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
      <div>
        <h2>WEF Nexus Europe</h2>
        <p className="mb-0">
          A research project on the drivers and governance of the water–energy–food nexus in Europe, by Vismay Loliyaniya.
        </p>
      </div>
      <div>
        <h2>Explore</h2>
        <ul className="list-unstyled mb-0">
          <li><Link to="/research">The research</Link></li>
          <li><Link to="/stakeholders">Stakeholder map</Link></li>
        </ul>
      </div>
      <div>
        <h2>Contact</h2>
        <ul className="list-unstyled mb-0">
          <li><a href="mailto:vismaymloliyaniya@gmail.com">vismaymloliyaniya@gmail.com</a></li>
          <li><a href="https://www.linkedin.com/in/vismayloliyaniya/" target="_blank" rel="noreferrer">LinkedIn profile</a></li>
        </ul>
      </div>
    </div>
  </footer>
);
