import { useState } from 'react'
import './App.css'
import { Square } from './componentes/Square'
import confetti from 'canvas-confetti'
import {TURNS,WINNER_COMBOS} from './constantes'
import { WinnerBox } from './componentes/WinnerBox'
import { checkWinner,checkEndGame } from './logic/functions'
function App() {
  const [board,setBoard]=useState(Array(9).fill(null))
  const [turn,setTurn]=useState(TURNS.X)
  const [winner,seTWinner]=useState(null)

 
  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    seTWinner(null)
  }

  
  const updateBoard = (index) => { 
    console.log(board[index])
    if(board[index] || winner) return 

      const newBoard=[...board]
      newBoard[index] =turn
      setBoard(newBoard)

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn) 
      window.localStorage.setItem('board',JSON.stringify(board))
      window.localStorage.setItem('turn',turn)
      const newWinner= checkWinner(newBoard)
      if(newWinner){   
        confetti()   
        seTWinner(newWinner)
      }else if(checkEndGame(newBoard)){
        seTWinner(false)
      }
    }

  return (
    <main className="container">
      <h1>TRES EN RAYA</h1>
      <button className='' onClick={resetGame}>Reset</button>
      <section className="juego"> 
        {
          board.map((value, index) => {
            return(   
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>  
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn ===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn=== TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerBox resetGame={resetGame} winner={winner}></WinnerBox>

    </main>
  );
}

export default App;
