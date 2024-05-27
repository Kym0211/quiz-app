import React from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

export default function ResultPage(props) {
    const navigate = useNavigate();
    const message = () => {
        if(props.score < 5) {
            return "Don't worry, you can always try again!"
        } else if(props.score < 7){
            return "Good job, you're getting there!"
        } else {
            return "Excellent!, You've aced the quiz!"
        }
    }
    function handleStartQuiz(){
        navigate('/')
    }
    return (
        <>
            <div className="hero-container result-page">
                <h1 className="result-page-content">Quiz Completed</h1>
                <h2 className="result-page-content">Your Score: {props.score}</h2>
                <h2 className="result-page-content">{message()}</h2>
                <button className="btn" onClick={handleStartQuiz}>Try Again</button>
            </div>
            {props.score > 6 && <Confetti width={window.innerWidth || 300}  />}
        </>
    );
}