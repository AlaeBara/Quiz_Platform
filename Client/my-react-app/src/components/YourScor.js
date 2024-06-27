import React, { useEffect, useState } from "react";
import "./yourScor.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navBar/Navbar";

const YourScor = () => {

    
    const [scores, setScores] = useState([]);
    const id = localStorage.getItem("id");
    const filier = localStorage.getItem("filier");
    const history = useNavigate();

    useEffect(() => {
        const fetchScores = async () => {
          try {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id");
            if (token){
              const response = await axios.get(`http://localhost:8000/votre_Score?id=${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              setScores(response.data);
            }else{
              history("/");
            }
           
          } catch (error) {
            console.error('Error fetching scores:', error.message);
          }
        };
    
        fetchScores();
      },[]);

  return (

    <>
        <Navbar id={id} filier={filier} />
        <div className="your-score-container">
            <h2>Your Scores</h2>
            {scores.length === 0 ? (
                <p>No scores available.</p>
            ) : (
                <ul className="score-list">
                    {scores.map((score) => (
                        <li key={score._id} className="score-item">
                            <p>Score: {score.Note}</p>
                            <p>Date: {new Date(score.Date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
  )
}

export default YourScor