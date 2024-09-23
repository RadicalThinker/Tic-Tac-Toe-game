import { useState } from 'react'
import './style.css'
import { useEffect } from 'react';
function Square({ value, onClick }) {
    return <button className="square" onClick={onClick}>{value}</button>
}

export default function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(''));
    // console.log(squares);
    const [isXTurn, SetXTurn] = useState(true);
    const [status, setStatus] = useState();
    function handleRestart(){
        SetXTurn(true);
        setSquares(Array(9).fill(''))
    }
    function getwinner(squares) {
        const winningPatterns = [
            [0, 1, 2], //all these index should be same  
            [3, 4, 5],//all these index should be same
            [6, 7, 8],//all these index should be same
            [2, 5, 8],//all these index should be same
            [0, 4, 8],//all these index should be same
            [2, 4, 6],//all these index should be same
            [0, 3, 6],//all these index should be same
            [1, 4, 7]//all these index should be same
        ];
        for (let i = 0; i < winningPatterns.length; i++) {
            const [x, y, z] = winningPatterns[i];
            if (squares[x] == squares[y] && squares[y] == squares[z]) {
                return squares[x];
            }
        }
        return 0;
    }

    useEffect(() => {
        if (getwinner(squares) == 0 && squares.filter(item => item == '').length == 0) {
            setStatus('This is a draw ! Please Restart')
        } else if (getwinner(squares) != 0) {
            setStatus(`Winner is ${getwinner(squares)}`)
        } else {
            setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`)
        }
    }, [squares, isXTurn])

    function handleclick(getCurrentSquare) {

        let cpySquares = [...squares];
        if (getwinner(cpySquares) != 0 || cpySquares[getCurrentSquare] != '') {
            return;
        }
        cpySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
        SetXTurn(!isXTurn);
        // console.log(cpySquares)
        setSquares(cpySquares);
    }
    return (
        <div className="tic-tac-toe-container">
            <div className="row">
                <Square value={squares[0]} onClick={() => handleclick(0)} />
                <Square value={squares[1]} onClick={() => handleclick(1)} />
                <Square value={squares[2]} onClick={() => handleclick(2)} />
            </div>
            <div className="row">
                <Square value={squares[3]} onClick={() => handleclick(3)} />
                <Square value={squares[4]} onClick={() => handleclick(4)} />
                <Square value={squares[5]} onClick={() => handleclick(5)} />
            </div>
            <div className="row">
                <Square value={squares[6]} onClick={() => handleclick(6)} />
                <Square value={squares[7]} onClick={() => handleclick(7)} />
                <Square value={squares[8]} onClick={() => handleclick(8)} />
            </div>
            <h1>{status}</h1>
            <button onClick={handleRestart}>Restart</button>
        </div>
    )
}