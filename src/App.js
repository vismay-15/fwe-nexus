import { Dashboard } from "./pages/dashboard";
import { Stakeholders } from "./pages/stakeholders";
import { Landing } from "./pages/landing";
import { Research } from "./pages/research";
import { Challenges } from "./pages/challenges";
import { Contact } from "./pages/contact";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./assets/css/style.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
        <Route path="/contact" element={<Contact />} />
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
