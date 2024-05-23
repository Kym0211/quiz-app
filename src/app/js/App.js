import React from "react";

export default function App() {
  return(
    <main className="hero-container">
      <section className="container">
        <h1>QUIZ TIME</h1>
        <p>Step into the realm of knowledge with our dynamic Quiz App! Choose from an array of captivating categories including Science & Nature, Sports, Politics, General Knowledge, and Arbitray. Each quiz, with options of 10, 20, or 30 questions, comes with a time limit tailored to the challenge: 5 minutes for 10 questions, 10 minutes for 20 questions, and 15 minutes for 30 questions. Select your preferred difficulty level - easy, medium, or hard - and embark on a thrilling journey of discovery. Embrace the challenge, ignite your curiosity, and let the pursuit of knowledge begin!</p>
      </section>
      <div className="quiz-details">
        <label htmlFor="category">Category: </label>
        <select id="category">
          <option value="9">General Knowledg</option>
          <option value="17" selected>Science & Nature</option>
          <option value="21">Sports</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
        </select>
        <label htmlFor="difficulty">Difficulty: </label>
        <select id="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label htmlFor="questions">Questions: </label>
        <select id="questions">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      <button type="button" className="btn">Start Quiz</button>
    </main>
  )
}