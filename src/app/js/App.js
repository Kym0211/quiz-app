import React, { useState, useEffect } from "react";
import Home from "./HomePage";
import data from "./data.json";  // temprory for styling puropse  
import QuizPage from "./QuizPage";
import ResultPage from "./ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// data.results.map((item) => {
//     console.log(item.question)
// })

export default function App(){
    
    
    const [quizType, setQuizType] = useState(JSON.parse(localStorage.getItem("quizType"))||[]);  // for storing quiz type to make quiz url so that i can fetch data from api
    useEffect(() => {
        quizType.length ? localStorage.setItem("quizType", JSON.stringify(quizType)) : localStorage.setItem("quizType", JSON.stringify([{category: 1}, {difficulty: "easy"}, {questions: 10}]));
    },[quizType,App]);
    
    const [score, setScore] = useState(0); // for storing score

    const time = {
        10: 5, //5000
        20: 10, //10000
        30: 20 //15000
    }
    let data1 = data.gk_easy_10
    let difficulty = quizType[1].difficulty === 'medium' ? 'med' : quizType[1].difficulty
    let available = true

    console.log(quizType)

    if(quizType[0].category === '1'){
        data1 = data[`gk_${difficulty}_${quizType[2].questions}`]
    }else if(quizType[0].category === '2'){
        data1 = data[`sn_${difficulty}_${quizType[2].questions}`]
    }else if(quizType[0].category === '3'){
        if(quizType[2].questions === '30'){
            available = false
        }
        else data1 = data[`sports_${difficulty}_${quizType[2].questions}`]
    }else if(quizType[0].category === '4'){
        if(quizType[2].questions === 10){
            data1 = data[`politics_${difficulty}_10`]
        }else available = false
    }

    return(
        <Router basename="/quiz-app">
            <Routes>
                <Route path="/" element={<Home quizType={quizType} setQuizType={setQuizType} isAvailable={available} />} />
                <Route path="/quiz" element={<QuizPage data={data1} time={time[quizType[2].questions]} setScore={setScore}/>} />
                <Route path="/result" element={<ResultPage score={score} />} />
            </Routes>
        </Router>
        // <Swr />
    )

}