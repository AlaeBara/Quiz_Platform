// Navbar.js (or Navbar.jsx)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = ({id,filier}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/");
  };
  const handleScore = () => {
    history("/Votre_Scores");
  };
  const handlehome = () => {
    history("/home");
  };

  return (
    <nav>
      <a onClick={handlehome}>Est Essouira </a>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <a>{id}</a>
        </li>
        <li>
          <a>{filier}</a>
        </li>
        <li>
          <a onClick={handleScore}>Your Score</a>
        </li>

        <li className="log">
          <a onClick={handleLogout}> log out</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
