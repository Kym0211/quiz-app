import React, { useState, useEffect } from "react";
import Home from "./HomePage";
import data from "./data.json";  // temprory for styling puropse  
import QuizPage from "./QuizPage";
import ResultPage from "./ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Swr from "./api"

// data.results.map((item) => {
//     console.log(item.question)
// })

export default function App(){
    
    
    const [quizType, setQuizType] = useState(JSON.parse(localStorage.getItem("quizType"))||[]);  // for storing quiz type to make quiz url so that i can fetch data from api
    useEffect(() => {
        quizType.length ? localStorage.setItem("quizType", JSON.stringify(quizType)) : localStorage.setItem("quizType", JSON.stringify([{category: 1}, {difficulty: "easy"}, {questions: 10}]));
    },[quizType]);
    
    // const [quizData, setQuizData] = React.useState([]) // for fetching data from api
    let quizData = []
    const [score, setScore] = useState(0); // for storing score

    const time = {
        10: 5, //5000
        20: 10, //10000
        30: 20 //15000
    }

    useEffect(() => {
	    const apiUrl = `https://opentdb.com/api.php?amount=30&category=9&type=multiple`;

        const fetchUrl = (apiUrl) => {
            fetch(apiUrl)
                .then((res) => res.json())
                .then((data) => {
                    quizData = data.results;
                });
        }
        fetchUrl(apiUrl);
    });
    let data1 = []
    if (quizData.length){
        data = quizData
    }else{
        data1 = data.results
    }


    return(
        <Router basename="/quiz-app">
            <Routes>
                <Route path="/" element={<Home quizType={quizType} setQuizType={setQuizType}  />} />
                <Route path="/quiz" element={<QuizPage data={data1} time={time[quizType[2].questions]} setScore={setScore} />} />
                <Route path="/result" element={<ResultPage score={score} />} />
            </Routes>
        </Router>
        // <Swr />
    )

}