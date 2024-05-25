import React, { useState, useEffect } from "react";
import Home from "./HomePage";
import data from "./data.json";    

console.log(data.results)

export default function App(){
    const [quizType, setQuizType] = useState(JSON.parse(localStorage.getItem("quizType"))||[]); 
  useEffect(() => {
      quizType.length ? localStorage.setItem("quizType", JSON.stringify(quizType)) : localStorage.setItem("quizType", JSON.stringify([{category: 1}, {difficulty: "easy"}, {questions: 10}]));
  },[quizType]);
    
    

    return(
        <>
            <Home quizType={quizType} setQuizType={setQuizType} />
        </>
    )

}