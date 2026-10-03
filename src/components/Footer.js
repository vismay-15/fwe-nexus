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
          <li><Link to="/challenges">Challenges and evidence</Link></li>
          <li><Link to="/stakeholders">Stakeholder map</Link></li>
        </ul>
      </div>
      <div>
        <h2>Contact</h2>
        <ul className="list-unstyled mb-0">
          <li><Link to="/contact">Send a message or suggestion</Link></li>
          <li><a href="mailto:vismaymloliyaniya@gmail.com">vismaymloliyaniya@gmail.com</a></li>
          <li><a href="https://www.linkedin.com/in/vismayloliyaniya/" target="_blank" rel="noreferrer">Vismay Loliyaniya, MSc, GMICE, CAVA, IQA</a></li>
        </ul>
      </div>
    </div>
    <div className="wrap site-footer__credits">
      <p>
        Organisation names belong to their owners and are used only to identify them. Profiles are summaries written
        from public sources linked on each profile; no endorsement by any organisation is implied.
      </p>
      <p>
        Credits: map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>{" "}
        contributors; simple outline map from <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>{" "}
        (public domain); statistics from Eurostat and the European Environment Agency (reused with attribution, charts drawn by the author); mapping by <a href="https://leafletjs.com/" target="_blank" rel="noreferrer">Leaflet</a>; fonts Playfair Display
        and Public Sans (SIL Open Font License). Text, diagrams and icons © {new Date().getFullYear()} Vismay Loliyaniya.
      </p>
    </div>
  </footer>
);
