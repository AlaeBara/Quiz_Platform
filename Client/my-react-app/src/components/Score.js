import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../navBar/Navbar';
import './Score.css';

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem("token");
        // Check if the token exists
        if (!token) {
          navigate("/");
        }
      } catch (error) {
        alert("Error occurred while fetching quiz data");
        console.error(error);
      }
    };
    fetchScores();
  }, [navigate]);

  const id = location.state?.id;
  const filier = location.state?.filier;
  const score = location.state?.score;

  return (
    <>
      <Navbar id={location.state.id} filier={location.state.filier} />
      <div className="box_score">
        <h2>Your Score: {location.state.score}</h2>
        <Link to="/home">
          <button className="returnBtn">Back</button>
        </Link>
      </div>
    </>
  );
};

export default Score;
