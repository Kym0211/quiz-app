import { useEffect } from "react";
import React , { useState } from "react";
import Home from "./Home";

export default function App(){

    // Home component state
    const [quizType, setQuizType] = useState(JSON.parse(localStorage.getItem("quizType"))||[]); 
    useEffect(() => {
        quizType.length ? localStorage.setItem("quizType", JSON.stringify(quizType)) : localStorage.setItem("quizType", JSON.stringify([{category: 1}, {difficulty: "easy"}, {questions: 10}]));
    },[quizType]);

    const categories=['General Knowledge', 'Science & Nature', 'sports', 'Politics','Art']
    const difficulties=['easy', 'medium', 'hard']
    const questions=[10, 20, 30]
    
    function handleChange(event){
        setQuizType((prev) => {
            return prev.map((item) => {
                if(event.target.id === Object.keys(item)[0]){
                    return {[event.target.id]: event.target.value}
                }
                return item;
            })
        })
    }

    function handleStartQuiz(){
        console.log("Start Quiz");
    }
    // End of Home component state

    
    return(
        <>
            <Home handleChange={handleChange} categories={categories} difficulties={difficulties} questions={questions} handleStartQuiz={handleStartQuiz}/>
        </>
    )

}