import { WINNER_COMBOS } from "../constantes"
export const checkWinner=(boardToChech)=>{
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
  export const checkEndGame=(newBoard)=>{
    return newBoard.every((square)=>square !==null)
  }