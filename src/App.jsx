import React, { Component } from "react";
import GameBoard from "./GameBoard";
import "./App.css";

class WhackAMole extends Component {
  constructor() {
    super();
    this.state = {
      gameStarted: false,
      difficulty: "medium",
      scores: [],
    };
  }

  startGame = (difficulty) => {
    this.setState({ gameStarted: true, difficulty });
  };

  updateScore = (score) => {
    this.setState((prevState) => ({
      scores: [...prevState.scores, score],
    }));
  };

  calculateAvgScore = () => {
    const { scores } = this.state;
    if (scores.length === 0) return 0;
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  };

  render() {
    return (
      <div className="container">
        <h1>🎯 Whack-a-Mole</h1>
        {!this.state.gameStarted ? (
          <div className="difficulty">
            <h3>Select Difficulty:</h3>
            <button onClick={() => this.startGame("easy")}>Easy</button>
            <button onClick={() => this.startGame("medium")}>Medium</button>
            <button onClick={() => this.startGame("hard")}>Hard</button>
          </div>
        ) : (
          <GameBoard difficulty={this.state.difficulty} updateScore={this.updateScore} />
        )}
        <div className="rules">
          <h2>Game Rules:</h2>
          <p>👹 Hit **Red Moles** = +3 points</p>
          <p>🐸 Avoid **Green Moles** = -1 point</p>
        </div>
        <h3>Average Score: {this.calculateAvgScore()}</h3>
      </div>
    );
  }
}

export default WhackAMole;
