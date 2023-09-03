
import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [pokemon, setPokemon] = useState([])
  const [guessed, setguessed] = useState([])
  const [imageFilter, setImageFilter] = useState(0)
  const [resetGame, setResetGame] = useState(false)
  const [errors, setErrors] = useState(3)
  const [score, setScore] = useState(0)


  const inputRef = useRef(null);
  

  function getRamdon () {
      var numeroAleatorio = Math.floor(Math.random() * 500) + 1;
      return numeroAleatorio;
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRamdon()}`).then(res => res.json())
    .then(data => setPokemon(data))

  }, [resetGame])

  /* console.log(pokemon) */
  
  function handleGuess(event) {
    event.preventDefault();

    let guessedValue = inputRef.current.value.toLowerCase();

    if(errors === 1) {
      guessedValue = ""
      setScore(0)
      handleReset()
    } else if (guessedValue === pokemon.name) {
      setImageFilter(100);
      /* setTimeout(() => {
        setScore(score + 1)
        handleReset()
      }, 1000); */
    } else {
      setErrors(errors - 1)
    }
    setguessed(guessedValue)
  }

  function handleReset() {
    setResetGame(!resetGame); // Establecer resetGame en true para reiniciar el juego

    setImageFilter(0)
    setguessed("")
    setErrors(3)
  }

  return (
    <>
      <main>
        <h1>GUESS THE POKEMON GAME</h1>
        <section className='pokemonCard'>
          <div>
            <p>Score: {score}</p>
          </div>
          <div className='pokemonCard__img'> 
          {pokemon && pokemon.sprites ? (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ filter: `brightness(${imageFilter}%)` }}
              />
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
          <form action="">
            <input type="text" name="pokeguess" id="guess" ref={inputRef} />
            <button onClick={handleGuess}>Guess</button>
          </form>
        </section>
        <div className='Result'>
          {guessed == "" ? <></> : guessed == pokemon.name ? <h2  className='result' style={{ color: `green` }}>CORRECTO</h2> :<> <h2 className='result' style={{ color: `red` }}>INCORRECTO</h2> Intentos restantes:{errors} </> }
        </div>

       {/*  <button className='reset' onClick={handleReset}>Reiniciar</button> */}
      </main>
    </>
  )
}

export default App
