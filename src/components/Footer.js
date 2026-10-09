import React from "react";

export const Footer = () => (
  <footer className="site-footer">
    <div className="wrap site-footer__credits">
      <p>
        Organisation names belong to their owners and are used only to identify them. Profiles are summaries written
        from public sources linked on each profile; no endorsement by any organisation is implied.
      </p>
      <p>
        Credits: map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>{" "}
        contributors; simple outline map from <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>{" "}
        (public domain); statistics from Eurostat and the European Environment Agency (reused with attribution, charts drawn by the
        author); mapping by <a href="https://leafletjs.com/" target="_blank" rel="noreferrer">Leaflet</a>; fonts Playfair Display,
        DM Sans and DM Mono (SIL Open Font License). Text, diagrams and icons © {new Date().getFullYear()} Vismay Loliyaniya.
      </p>
    </div>
    <div className="site-footer__bar">
      <div className="bar-inner">
        <div className="foot-l">
          <strong>Vismay Loliyaniya</strong>, GMICE — Educator, Researcher &amp; Career Advisor
        </div>
        <div className="foot-r">
          London, UK &nbsp;·&nbsp; Built Environment &nbsp;·&nbsp; Civil Engineering &nbsp;·&nbsp;{" "}
          <a href="/fwe-nexus/">WEF Nexus Europe</a>
        </div>
      </div>
    </div>
  </footer>
);
