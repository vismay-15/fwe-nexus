import { Dashboard } from "./pages/dashboard";
import { Stakeholders } from "./pages/stakeholders";
import { Landing } from "./pages/landing";
import { Research } from "./pages/research";
import { Challenges } from "./pages/challenges";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./assets/css/style.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

const TITLES = {
  "/": "WEF Nexus Europe | Water–Energy–Food Nexus Research | Vismay Loliyaniya",
  "/research": "The research | WEF Nexus Europe | Vismay Loliyaniya",
  "/challenges": "Challenges and evidence | WEF Nexus Europe | Vismay Loliyaniya",
  "/stakeholders": "Stakeholder map | WEF Nexus Europe | Vismay Loliyaniya",
};

// Contact now lives on the main page; old links are sent there.
const ContactRedirect = () => {
  const { search } = useLocation();
  useEffect(() => {
    const q = new URLSearchParams(search);
    if (!q.get("topic")) q.set("topic", "research");
    window.location.replace(`/?${q.toString()}#contact`);
  }, [search]);
  return <p className="wrap" style={{ padding: "48px 0" }}>Opening the contact form…</p>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.title = TITLES[pathname] || TITLES["/"];
  }, [pathname]);
  return null;
};

const Pages = () => {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary resetKey={pathname}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/research" element={<Research />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/contact" element={<ContactRedirect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <button
        className="skip-link"
        onClick={() => {
          const m = document.getElementById("main");
          m?.setAttribute("tabindex", "-1");
          m?.focus();
        }}
      >
        Skip to content
      </button>
      <Header />
      <main id="main" className="main">
        <Pages />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
