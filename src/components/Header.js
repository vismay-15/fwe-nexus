import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NexusGlyph } from "./NexusGlyph";
import "../assets/css/header.css";

const PORTFOLIO = "https://www.vismayloliyaniya.com/";

const LINKS = [
  { to: "/", label: "Overview", end: true },
  { to: "/research", label: "Research" },
  { to: "/challenges", label: "Challenges" },
  { to: "/stakeholders", label: "Stakeholder map" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  React.useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a href={PORTFOLIO} className="brand" aria-label="Vismay Loliyaniya, home page">
          <NexusGlyph sectors={["water", "energy", "food", "ecosystems", "climate"]} type="" size={38} />
          <span className="brand__text">
            <span className="brand__name">Vismay Loliyaniya</span>
            <span className="brand__role">WEF Nexus Europe · Research</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="site-nav" className={`site-nav ${open ? "is-open" : ""}`} aria-label="Main">
          <a href={PORTFOLIO}>Portfolio</a>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className={({ isActive }) => `nav-cta${isActive ? " active" : ""}`}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
