import { useState } from "react";


export default function GameBoard({onSelectSquare, board}) {
    
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //         setGameBoard((prevGameBoard)=>{
    //             const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
    //             console.log(updatedBoard);
    //             updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //             return updatedBoard;
    //         });
    //         onSelectSquare(rowIndex, colIndex); //it will be executed when the square is clicked.
    // }

    return <ol id="game-board">
        {/* here we are just mapping through the initialGameBoard array and when me map the first time it will get the row that is the also an array and then we map through that inner array and after that it will display all the values of the inner array one by one which is initially set to null */}
        {board.map((row, rowIndex) => {
            return <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => {
                        return <li key={colIndex}>
                            <button onClick={()=>onSelectSquare(rowIndex, colIndex)}
                            disabled={playerSymbol !== null}
                            >{playerSymbol}</button>
                            </li>
                    })}
                </ol>
            </li>
        })}
        </ol>
}