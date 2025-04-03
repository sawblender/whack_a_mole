import React, { useState, useEffect } from "react";

const NUM_HOLES = 9;
const difficultySettings = {
  easy: 1000,
  medium: 800,
  hard: 500,
};

const GameBoard = ({ difficulty, updateScore }) => {
  const [score, setScore] = useState(0);
  const [moleIndex, setMoleIndex] = useState(null);
  const [moleType, setMoleType] = useState("red"); // "red" or "green"
  const [timeLeft, setTimeLeft] = useState(30);

  const redMoleSound = new Audio("/red-mole.mp3");
  const greenMoleSound = new Audio("/green-mole.mp3");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      updateScore(score);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const moleTimer = setInterval(() => {
        setMoleIndex(Math.floor(Math.random() * NUM_HOLES));
        setMoleType(Math.random() > 0.5 ? "red" : "green"); // 50% chance of red or green mole
      }, difficultySettings[difficulty]);
      return () => clearInterval(moleTimer);
    }
  }, [timeLeft, difficulty]);

  const hitMole = (index) => {
    if (index === moleIndex) {
      if (moleType === "red") {
        redMoleSound.play();
        setScore((prevScore) => prevScore + 3);
      } else {
        greenMoleSound.play();
        setScore((prevScore) => prevScore - 1);
      }
      setMoleIndex(null); // Remove mole after hit
    }
  };

  return (
    <div className="game-container">
      <p>Time Left: {timeLeft}s</p>
      <p>Score: {score}</p>
      <div className="grid">
        {Array.from({ length: NUM_HOLES }).map((_, index) => (
          <div key={index} className="hole" onClick={() => hitMole(index)}>
            {moleIndex === index && <div className={`mole ${moleType}`}></div>}
          </div>
        ))}
      </div>
      {timeLeft === 0 && (
        <div className="game-over">
          <h2>Game Over! 🎮</h2>
          <p>Final Score: {score}</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
