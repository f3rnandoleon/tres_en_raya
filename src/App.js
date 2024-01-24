import { useState } from 'react'
import './App.css'
const TURNS = {
  X: 'x',
  O: 'o'
}


const Square=({children,isSelected,updateBoard,index})=>{
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () =>{
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
 }
const WINNER_COMBOS=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board,setBoard]=useState(Array(9).fill(null))
  const [turn,setTurn]=useState(TURNS.X)
  const [winner,seTWinner]=useState(null)

  const checkWinner=(boardToChech)=>{
    for (const combo of WINNER_COMBOS){
        const [a,b,c] = combo
        if(
          boardToChech[a] && 
          boardToChech[a] === boardToChech[b] && 
          boardToChech[a] === boardToChech[c] 
          
        ) {
          return boardToChech[a]
        }
      
    }
    return null
  }
  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    seTWinner(null)
  }

  const checkEndGame=(newBoard)=>{
    return newBoard.every((square)=>square !==null)
  }
  const updateBoard = (index) => { 
    console.log(board[index])
    if(board[index] || winner) return 

      const newBoard=[...board]
      newBoard[index] =turn
      setBoard(newBoard)

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn) 
      const newWinner= checkWinner(newBoard)
      if(newWinner){      
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

      {
        winner !== null && (
          <section className='winner'>
            <div className='texto'>
              <h2>
                {
                  winner ===false
                    ? 'Empate'
                    : 'Gano'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de Nuevo</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  );
}

export default App;
