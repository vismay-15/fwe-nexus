import { Dashboard } from "./pages/dashboard";
import { Stakeholders } from "./pages/stakeholders";
import { Landing } from "./pages/landing";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stakeholders" element={<Stakeholders />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
