import './App.css'
const TURNS = {
  X: 'x',
  O: 'o'
}


 const Square=({children,updateBoard,index})=>{
  return(
    <div className="square">
      {children}
    </div>
  )
 }
function App() {
  const board=Array(9).fill(null)
  return (
    <main className="container">
      <h1>TRES EN RAYA</h1>
      <section className="juego"> 
        {
          board.map((value, index) => {
            return(
              <Square
                key={index}
                index={index}
              >
                
              </Square>  
            )
          })
        }
      </section>
    </main>
  );
}

export default App;
