// Navbar.js (or Navbar.jsx)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = ({id,filier}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history("/");
  };
  const handleScore = () => {
    history("/admin_home");
  };
  const handlehome = () => {
    history("/admin_home");
  };
  const handlequiz = () => {
    history("/addQuiz");
  };
  const handleresult = () => {
    history("/result");
  };

  return (
    <nav>
      <a onClick={handlehome}>Est Essouira-Admin </a>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
    
        <li>
          <a onClick={handleScore}>add student</a>
        </li>

        <li>
          <a onClick={handlequiz}>add Qzuiz</a>
        </li>

        <li>
          <a onClick={handleresult}>Result</a>
        </li>
        

        <li className="log">
          <a onClick={handleLogout}> log out</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
