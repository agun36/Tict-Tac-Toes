// Importing necessary components and constants
import { useState } from "react";
import "../App/App.scss";
import GameBoard from "../components/GameBoard/GameBoard";
import Log from "../components/Log/Log";
import Player from "../components/Player/Player";
import { WINNING_COMBINATIONS } from "../Winning-combinations";
import { GameOver } from "../components/GameOver/GameOver";
import { PLAYERS } from "../PlayersSynbol";
import { INITIAL_GAME_BOARD } from "../InitialGameBoard"; 
import Header from "../components/Header/Header";

// Function to determine the active player based on the game turns
const deriveActivePlayer = (gameTurns) => {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
};

// Function to determine the winner of the game
const deriveWinner = (gameBoard, players) =>{
    let winner;
    for (const combinations of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
        const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
        const thirdSquareSymbol  = gameBoard[combinations[2].row][combinations[2].column];

        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
            winner = players[firstSquareSymbol]
        }
    }
    return winner;
}

// Function to derive the current state of the game board based on the game turns
const deriveGameBoard =(gameTurns)=>{
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

// Main App component
const App = () => {
    const [players, setPlayers] = useState(PLAYERS) // State for players
    const [gameTurns, setGameTurns] = useState([]); // State for game turns

    const activePlayer = deriveActivePlayer(gameTurns); // Active player
    const gameBoard = deriveGameBoard(gameTurns); // Current game board
    const winner = deriveWinner(gameBoard, players); // Winner of the game
    const hasDraw = gameTurns.length === 9 && !winner; // Check if the game is a draw

    // Function to handle the selection of a square on the game board
    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns((prevTurns) => {
            let currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [
                { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    };

    // Function to handle a rematch
    const handleRematch = () =>{
        setGameTurns([]);
    }

    // Function to handle the change of a player's name
    const handlePlayerName = (symbol, newName) =>{
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        })
    }

    // Render the App component
    return (
        <main>
            <div id="game-container">
                <Header/>
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerName}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangeName={handlePlayerName}
                    />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App; // Export the App component