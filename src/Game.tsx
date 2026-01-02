import { useState } from "react";

const initialBoardState: string[] = Array(9).fill(null);
const initialIsXTurnState: boolean = true;
const initialWinnerState = null;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

export default function Game() {
  const [board, setBoard] = useState<string[]>(initialBoardState);
  const [isXTurn, setIsXTurn] = useState(initialIsXTurnState);
  const [winner, setWinner] = useState<string | null>(initialWinnerState);

  function getTurn(): string {
    return isXTurn ? "X" : "O";
  }

  function checkWinner(squares: string[]) {
    for (let combination of winningCombination) {
      const [a, b, c] = combination;

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
      }
    }
  }

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = getTurn();

    checkWinner(updatedBoard);

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  }

  function getGameStatus(): string {
    if (winner) return `Winner: ${winner}`;

    if (board.every((square) => square !== null)) return "It's a Draw!";

    return `Next Player: ${getTurn()}`;
  }

  function resetGame() {
    setBoard(initialBoardState);
    setIsXTurn(initialIsXTurnState);
    setWinner(initialWinnerState);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-100 mx-5">
        <h1 className="text-5xl font-semibold text-white mb-8 text-center">
          Tic Tac Toe
        </h1>

        <div
          className={`text-center mb-6 ${winner
              ? "text-4xl font-bold text-green-400"
              : "textxl text-white"
            }`}
        >
          {getGameStatus()}
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <div className="relative group" key={index}>
              <div
                onClick={() => handleClick(index)}
                className={`h-32 flex justify-center items-center bg-gray-800 rounded-md text-6xl font-bold transition-colors duration-200 ${(!square && !winner) ? "hover:bg-gray-700" : ""
                  } ${square === "X" ? "text-white" : "text-slate-400"}`}
              >
                {square}
                {!square && !winner && (
                  <button
                    className={`opacity-0 group-hover:opacity-100 transition-opacity text-white h-32 w-full bg-gray-800 rounded-md text-6xl font-bold duration-200 hover:bg-gray-700 ${square === "X" ? "text-white" : "text-slate-400"
                      }`}
                  >
                    {getTurn()}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-full py-3 text-lg font-bold text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
          onClick={resetGame}
        >
          RESET GAME
        </button>
      </div>
    </div>
  );
}
