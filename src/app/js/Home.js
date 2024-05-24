import React from "react";

export default function Home(props) {

  const defaultValues =[]

  const catOptions = props.categories.map((category, index) => {

    if(localStorage.getItem("quizType") && index+1 === Number(JSON.parse(localStorage.getItem("quizType"))[0].category)) defaultValues.push(index+1)

    return <option key={index} value={index+1}>{category}</option>

  })

  const diffOptions = props.difficulties.map((difficulty, index) => {

    if(localStorage.getItem("quizType") && difficulty === JSON.parse(localStorage.getItem("quizType"))[1].difficulty) defaultValues.push(difficulty)

    return <option key={index} value={difficulty}>{difficulty}</option>

  })

  const quesOptions = props.questions.map((question, index) => {

    if(localStorage.getItem("quizType") && question === Number(JSON.parse(localStorage.getItem("quizType"))[2].questions)) defaultValues.push(question)

    return <option key={index} value={question}>{question}</option>

  })

  return(
    <main className="hero-container">
      <section className="container">
        <h1>QUIZ TIME</h1>
        <p>Step into the realm of knowledge with our dynamic Quiz App! Choose from an array of captivating categories including Science & Nature, Sports, Politics, General Knowledge, and Arbitray. Each quiz, with options of 10, 20, or 30 questions, comes with a time limit tailored to the challenge: 5 minutes for 10 questions, 10 minutes for 20 questions, and 15 minutes for 30 questions. Select your preferred difficulty level - easy, medium, or hard - and embark on a thrilling journey of discovery. Embrace the challenge, ignite your curiosity, and let the pursuit of knowledge begin!</p>
      </section>

      <div className="quiz-details">

        <label htmlFor="category" className="label">Category: </label>
        <select id="category" className="select category" onChange={props.handleChange} defaultValue={defaultValues[0]}>
          {catOptions}
        </select>

        <label htmlFor="difficulty" className="label">Difficulty: </label>
        <select id="difficulty" className="select" onChange={props.handleChange} defaultValue={defaultValues[1]}>
          {diffOptions}
        </select>

        <label htmlFor="questions" className="label">Questions: </label>
        <select id="questions" className="select" onChange={props.handleChange} defaultValue={defaultValues[2]}>
          {quesOptions}
        </select>

      </div>
      <button type="button" className="btn" onClick={props.handleStartQuiz}>Start Quiz</button>
    </main>
  )
}