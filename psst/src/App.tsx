import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./registerPage/RegisterPage";
// import MessagingPage from "./messagingPage/MessagingPage";
// import LogoutPage from "./logout/LogoutPage";

function App() {
  return (
    <div className="App">
      <div className="App-Container">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/messaging" element={<MessagingPage />} />
            <Route path="/logout" element={<LogoutPage />} /> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
