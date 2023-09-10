import React, { useState, useEffect } from 'react';

const App = () => {
  const guesses = ['Guess1', 'Guess2', 'Guess3', 'Guess4', 'Guess5'];
  const maxTurnsPerTeam = 5;

  const [currentTeam, setCurrentTeam] = useState(1);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentGuess, setCurrentGuess] = useState('');
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [turnStarted, setTurnStarted] = useState(false);

  useEffect(() => {
    if (currentTurn > maxTurnsPerTeam * 2) {
      setGameOver(true);
    } else {
      setTimer(30);
      setCurrentGuess(getRandomGuess());
      setTurnStarted(false);
    }
  }, [currentTurn]);

  useEffect(() => {
    let countdown;
    if (timer > 0 && !gameOver && turnStarted) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && !gameOver && turnStarted) {
      switchTurn();
    }

    return () => {
      clearTimeout(countdown);
    };
  }, [timer, gameOver, turnStarted]);

  const getRandomGuess = () => {
    const randomIndex = Math.floor(Math.random() * guesses.length);
    return guesses[randomIndex];
  };

  const switchTurn = () => {
    setCurrentTurn(currentTurn + 1);
    setCurrentTeam(currentTurn % 2 === 1 ? 2 : 1);
  };

  const handleStartTurn = () => {
    setTurnStarted(true);
  };

  const handleCorrectGuess = () => {
    if (currentTeam === 1) {
      setTeamAScore(teamAScore + 1);
    } else {
      setTeamBScore(teamBScore + 1);
    }
    switchTurn();
  };

  return (
    <div className="App">
      <h1>Charades Game</h1>
      {gameOver ? (
        <div>
          <h2>Game Over</h2>
          <p>Team A Score: {teamAScore}</p>
          <p>Team B Score: {teamBScore}</p>
          <p>{teamAScore > teamBScore ? 'Team A' : 'Team B'} Wins!</p>
        </div>
      ) : (
        <div>
          <h2>Team {currentTeam}'s Turn</h2>
          <p>Time Left: {timer} seconds</p>
          <p>Current Guess: {currentGuess}</p>
          {!turnStarted ? (
            <button onClick={handleStartTurn}>Start Turn</button>
          ) : (
            <button onClick={handleCorrectGuess}>Correct Guess</button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
