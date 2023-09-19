import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Pokemon from './Component/Pokemon';
import './App.scss'; 

function App() {

  const [pokemonSearch, setPokemonSearch] = useState("");
  const [pokeDex, setPokeDex] = useState([]);
  const [pokemonCaught, setPokemonCaught] = useState([]);
  const [pokemonSuggestion, setPokemonSuggestion] = useState([]);

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getSuggestions = () => {
    setPokemonSuggestion([]);
    for(var i=0; i < 6; i++) {
      let random = randomInteger(1,999);

      fetch(`https://pokeapi.co/api/v2/pokemon/${random}/`)
      .then((response) => response.json())
      .then((data) => {        
        setPokemonSuggestion(p => [...p, data]);
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let numCaught = 1;
    if(pokemonSearch != "") {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch.toLocaleLowerCase()}/`)
      .then((response) => response.json())
      .then((data) => {
        setPokeDex(p => [...p, data]);
        setPokemonCaught(p => [...p, numCaught]);
        setPokemonSearch("");
      });
    }    
  }

  const removePokemon = (index) => {
    setPokeDex(pokeDex.filter((v, i) => i != index));
    setPokemonCaught(pokemonCaught.filter((v, i) => i != index));
  }

  const updateNumCaught = (index) => {
    const update = pokemonCaught.map((v, i) => {
      if(i == index) {
        return v + 1;
      } else {
        return v;
      }      
    });
    setPokemonCaught(update);
  }

  return (
    <div className="App">
      <h1>How many Pokemon have you caught?</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="Search for a Pokemon" value={pokemonSearch} onChange={(e) => setPokemonSearch(e.target.value)} />
        </label>
        <div className="search_btn">
          <input className="btn" type="submit" />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>        
      </form>

      <div className="suggestions">
        <p>Need some suggestions? <button className="btn" onClick={getSuggestions}>Surprise!</button></p>
        {pokemonSuggestion.length > 0 &&
        <>
          <small>Click and copy a name.</small>
          <ul>
            {pokemonSuggestion.map((p, i) => <li key={i} onClick={() => navigator.clipboard.writeText(p.name)}>{p.name}</li>)}
          </ul>
        </>
        }
      </div>
      
      { pokeDex.length > 0 ? <Pokemon model={ pokeDex } numCaught={pokemonCaught} parentRemovePokemon={removePokemon} parentUpdateNumCaught={updateNumCaught} /> : <NoPokemon /> }
    </div>
  );
}

function NoPokemon() {
  return (
    <>
      <h3>My Pokedex</h3>
      <p>Wanna be the very best? Quick, catch something!</p>
    </>
  );
}

export default App;