import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { NexusGlyph } from "./NexusGlyph";
import "../assets/css/header.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/research", label: "Research" },
  { to: "/stakeholders", label: "Stakeholder map" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  React.useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="wrap site-header__bar">
        <Link to="/" className="brand" aria-label="WEF Nexus Europe, home">
          <NexusGlyph sectors={["water", "energy", "food", "ecosystems", "climate"]} type="" size={30} />
          <span className="brand__name">WEF Nexus Europe</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <nav id="site-nav" className={`site-nav ${open ? "is-open" : ""}`} aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
