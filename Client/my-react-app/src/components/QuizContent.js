import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizContent.css";
import PlayQuiz from "./PlayQuiz";


const QuizContent = ({ filier , id}) => {
    const history = useNavigate();
    const [quizs, setQuizs] = useState([]);
    const [startedQuiz, setStartedQuiz] = useState(false);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const token = localStorage.getItem("token");
                // Check if the token exists
                if (token) {
                    const res = await axios.post("http://localhost:8000/getQuizOfuser", { filier }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setQuizs(res.data || []);
                } else {
                    history("/");
                }
            } catch (error) {
                alert("Error occurred while fetching quiz data");
                console.error(error);
            }
        };
    
        fetchQuizData();
    }, [filier, history]);
    

    const handleStartQuiz = () => {
        if (quizs.length > 0) {
            setStartedQuiz(true);
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    };


    const saveResultsToDatabase = async (id, filier, score) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.post(
                "http://localhost:8000/addQuizScore",
                {
                    id,
                    filier,
                    score,
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                );

                if (response.status === 200) {
                console.log('Results saved successfully!');
                } else {
                console.error('Failed to save results.');
                }
            } else {
                console.error('Token not found');
            }
        } catch (error) {
          console.error('Error saving results:', error.message);
        }
    };
      

    const calculateScore = () => {
        let userScore = 0;
      
        quizs.forEach((currentQuiz, index) => {
          const { option1, option2, option3, option4, answer } = currentQuiz;
      
          if (!option1 || !option2 || !option3 || !option4 || !answer) {
            console.error(`Quiz data for question ${index + 1} is missing or incomplete.`);
            return;
          }
      
          const selectedAnswerIndex = selectedOptions[index];
          const selectedAnswer = currentQuiz[`option${selectedAnswerIndex}`];
      
          if (selectedAnswer === answer) {
            userScore++;
          }
        });
      
        setScore(userScore);
        console.log('Total Score:', userScore);
        saveResultsToDatabase(id, filier,userScore);
        history('/score', { state:{score: userScore , id: id, filier: filier }});
    };
      
      
    const handleRadioChange = (option) => {
        setSelectedOptions((prevOptions) => {
          const updatedOptions = prevOptions.includes(option)
            ? prevOptions.filter((item) => item !== option)
            : [...prevOptions, option];
          console.log(selectedOptions)
          return updatedOptions;
        });
    };

    
      
      
    return (
        <>

            {quizs.length > 0 ? (
                !startedQuiz ? (
                    <div className="Btn_commence">
                        <button onClick={handleStartQuiz}>Commence quiz</button>
                    </div>
                ) : (
                    currentQuizIndex < quizs.length && (
                        <div className="quiz-container">
                            <div key={currentQuizIndex} className="quiz-card">
                                <h4 className="quiz-question"><u>Question:</u> {quizs[currentQuizIndex].question}</h4>
                                <form className="quiz-options">
                                    <label>
                                        <input
                                        type="radio"
                                        name="quizOption"
                                        value={quizs[currentQuizIndex].option1}
                                        onChange={() => handleRadioChange(1)}
                                        />
                                         {quizs[currentQuizIndex].option1}
                                    </label>
                                    <label>
                                        <input
                                        type="radio"
                                        name="quizOption"
                                        value={quizs[currentQuizIndex].option2}
                                        onChange={() => handleRadioChange(2)}
                                        />
                                         {quizs[currentQuizIndex].option2}
                                    </label>
                                    <label>
                                        <input
                                        type="radio"
                                        name="quizOption"
                                        value={quizs[currentQuizIndex].option3}
                                        onChange={() => handleRadioChange(3)}
                                        />
                                         {quizs[currentQuizIndex].option3}
                                    </label>
                                    <label>
                                        <input
                                        type="radio"
                                        name="quizOption"
                                        value={quizs[currentQuizIndex].option4}
                                        onChange={() => handleRadioChange(4)}
                                        />
                                        {quizs[currentQuizIndex].option4}
                                    </label>
                                </form>

                                <div className="btn-container">
                                    {currentQuizIndex !== quizs.length - 1 && (
                                        <button className="btns_Qcm" onClick={() => {
                                            handleNextQuestion();
                                        }}>Next</button>
                                    )}

                                    {currentQuizIndex === quizs.length - 1 && (
                                        <button className="btns_Qcm" onClick={calculateScore}>Calculate Score</button>
                                    )}
                                </div>

                            </div>
                        </div>

                    )
                )
            ) : (
                <PlayQuiz />
            )}

            
        </>
    );
};

export default QuizContent;


















































