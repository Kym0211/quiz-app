import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
export default function QuizPage(props) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem("quizData");
        return savedFormData ? JSON.parse(savedFormData) : {};
    }); // for storing form data


    const getStoredOptions = () => {
        const storedOptions = localStorage.getItem("shuffledOptions");
        return storedOptions ? JSON.parse(storedOptions) : null;
    }

    console.log(props);
    const [shuffledOptions, setShuffledOptions] = useState(() => {
        const storedOptions = getStoredOptions();
        if (storedOptions) return storedOptions;
        else {
            const initialOptions = props.data.map(item => {
                let options = [item.correct_answer, ...item.incorrect_answers];
                options = options.sort(() => Math.random() - 0.5);
                return { question: item.question, options: options };
            });

            localStorage.setItem("shuffledOptions", JSON.stringify(initialOptions));
            return initialOptions;
        }
    }); // for storing shuffled options

    function handleChange(event) {
        const { name, value } = event.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        localStorage.setItem("quizData", JSON.stringify(updatedFormData));
    }

    function createOptions(item) {
        const optionsForQuestion = shuffledOptions.find(x => x.question === item.question).options;
        return optionsForQuestion.map((option) => {
            return (
                <section key={nanoid()} className="option">
                    <input 
                        type="radio" 
                        id={option} 
                        name={item.question} 
                        value={option} 
                        checked={formData[item.question] === option}
                        onChange={handleChange} 
                    />
                    <label htmlFor={option}>{option}</label>
                </section>
            );
        });
    }

    function submitQuiz(event) {
        event.preventDefault();
        let score = 0;
        props.data.forEach(item => {
            if (formData[item.question] === item.correct_answer){
                score++;
            }
        });
        props.setScore(score);
        localStorage.removeItem("quizStartTime");
        localStorage.removeItem("quizData");
        localStorage.removeItem("shuffledOptions");
        localStorage.removeItem("timeRemaining");
        navigate('/result');
    }

    // for timer
    const [timeRemaining, setTimeRemaining] = useState(() => {
        const savedStartTime = localStorage.getItem("quizStartTime");
        const currentTime = Date.now();
        const duration = parseInt(props.time) * 1000;

        if (savedStartTime) {
            const elapsedTime = currentTime - parseInt(savedStartTime);
            const remainingTime = Math.max((duration - elapsedTime) / 1000, 0);
            if (remainingTime === 0) submitQuiz(new Event('submit'));
            return remainingTime;
        } else {
            localStorage.setItem("quizStartTime", currentTime);
            return parseInt(props.time);
        }
    });

    useEffect(() => { // timer
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    submitQuiz(new Event('submit'));
                    return 0;
                }
                const newTime = prevTime - 1;
                localStorage.setItem("timeRemaining", newTime);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const ques = props.data.map((item, index) => { // for questions
        return (
            <div key={nanoid()} className="question-container">
                <h3>{index + 1}. {item.question}</h3>
                <div className="options">
                    {createOptions(item)}
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="timer">
                <h2 className="timer-header">Time Remaining: {Math.floor(timeRemaining)} seconds</h2>
            </div>
            <div className="hero-container quiz-container">
                <form onSubmit={submitQuiz} className="quiz-container_form">
                    {ques}
                    <button type="submit" className="btn submit-btn" onClick={(e) => submitQuiz(e)}>Submit</button>
                </form>
            </div>
        </>
    );
}
