import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { WINNING_COMBINATIONS } from "./components/winning-combination.js";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';//it means that the player with the symbol X is active initially means it will start\
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD].map(innerArray => [...innerArray]);  //making a deep copy of the initialGameBoard array so that we don't change the original array so when we restart or empty the it will not affect the original array.
    for(const turn of gameTurns){
        const {square, player} = turn; //object destructuring
        const {row, col} = square;     //object destructuring

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner; 

  for ( const combination of WINNING_COMBINATIONS) {
    const firstSqaureSymbol = gameBoard[combination[0].row][combination[0].column]; //gameboard is basically a multi dimensional array so we are looping through the WINNING_COMBINATIONS array and each element in this array consist of the arrays and then we are taking out the row and the column from the object that are available in the array
    const secondSqaureSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSqaureSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if(firstSqaureSymbol && firstSqaureSymbol == secondSqaureSymbol  && firstSqaureSymbol === thirdSqaureSymbol){
      winner = players[firstSqaureSymbol];
    }
  }

  return winner;
} 

function App() {
  
  const [players, setPlayer ] = useState({
    X: 'player 1',
    O: 'player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = deriveActivePlayer(gameTurns);  //passing game turn value to deriveActivePlayer function that is outside the app component

  const gameBoard = deriveGameBoard(gameTurns);
  
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;  //if game turns length is 9 and there is no winner then it means that it is a draw

  function handleSelectSquare(rowIndex, colIndex) {
    //it will be called when the player clicks on a square an it will change the active player
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
          row: rowIndex, 
          col: colIndex
        },
        player: currentPlayer},
        ...prevTurns];
        return updatedTurns;
    });
  }
  function handleRestart () {
    setGameTurns([]); //empty the turns array to restart everything
  }

  function handlePlayerNameChange(playerSymbol, newPlayerName) {
    setPlayer((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: newPlayerName
      }
    })
  }
  return (
    
    <main>
    <Header items={["Home", "Contact", "About us", "Login"]}/>
      <div id="game-container"> 
        <ol id="players" className="highlight-player">
         
          <Player 
          initialName={players.X}
          playerSymbol={"X"}
          isActive={currentPlayer === "X"}
          onChangeName = {handlePlayerNameChange}
          />
          <Player 
          initialName={players.O}
          playerSymbol={"O"}
          isActive={currentPlayer === "O"}
          onChangeName = {handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board={gameBoard}
        />
      </div>

      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
