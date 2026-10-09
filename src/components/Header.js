import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NexusGlyph } from "./NexusGlyph";
import "../assets/css/header.css";

// The site-wide menu, identical to the one on vismayloliyaniya.com.
const SITE = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Guidance" },
  { href: "/#projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/fwe-nexus/", label: "WEF Nexus", current: true },
  { href: "/#skills", label: "Skills" },
];

// Tabs inside the WEF Nexus section.
const TABS = [
  { to: "/", label: "Overview", short: "Overview", end: true },
  { to: "/research", label: "The research", short: "Research" },
  { to: "/challenges", label: "Challenges", short: "Challenges" },
  { to: "/stakeholders", label: "Stakeholder map", short: "Map" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  React.useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="topnav">
        <a href="/" className="nav-brand">
          <span className="nav-logo" aria-hidden="true">VL</span>
          <span>
            <span className="nav-text-name">Vismay Loliyaniya</span>
            <span className="nav-text-role">
              GMICE · Educator · Researcher<span className="role-extra"> · Career Advisor</span>
            </span>
          </span>
        </a>
        <ul className="nav-links">
          {SITE.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={l.current ? "is-current" : undefined} aria-current={l.current ? "page" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/#contact" className="nav-cta">
              Contact
            </a>
          </li>
        </ul>
        <button
          className={`hamburger${open ? " open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-nav" className={`mobile-nav${open ? " open" : ""}`}>
        {SITE.map((l) => (
          <a key={l.href} href={l.href} className={l.current ? "is-current" : undefined}>
            {l.label}
          </a>
        ))}
        <a href="/#contact">Get In Touch</a>
      </div>
      <nav className="subnav" aria-label="WEF Nexus Europe">
        <span className="subnav__title">
          <NexusGlyph sectors={["water", "energy", "food", "ecosystems", "climate"]} type="" size={24} />
          <span>WEF Nexus Europe</span>
        </span>
        <div className="subnav__tabs">
          {TABS.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="t-long">{t.label}</span>
              <span className="t-short">{t.short}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};
