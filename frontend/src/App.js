import "./App.css";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import SummaryPage from "./components/SummaryPage";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />}>
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
