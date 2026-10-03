import { Dashboard } from "./pages/dashboard";
import { Stakeholders } from "./pages/stakeholders";
import { Landing } from "./pages/landing";
import { Research } from "./pages/research";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./assets/css/style.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/research" element={<Research />} />
          <Route path="/stakeholders" element={<Stakeholders />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
