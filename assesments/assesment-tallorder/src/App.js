import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Pokemon from './Component/Pokemon';
import './App.scss'; 

function App() {

  //TO DO LIST:
  // Bulk add 
  //  - pills
  // Bulk search
  //  - for loop search
  // Bulk delete - DONE
  //  - select bulk delete
  // Filter
  // Auto-fill search
  // No duplicates - DONE
  //  - show error message
  // Animations?

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
    
    if(pokemonSearch !== "") {
      let numCaught = 1;

      if(pokeDex.length > 0 && pokeDex.filter((v) => v.name === pokemonSearch).length > 0) {
        //pop up or something
        console.log(`You already have a ${pokemonSearch.toLocaleUpperCase()}`);
      } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch.toLocaleLowerCase()}/`)
        .then((response) => response.json())
        .then((data) => {
          setPokeDex(p => [...p, data]);
          setPokemonCaught(p => [...p, numCaught]);
          setPokemonSearch("");
        });
      }      
    }    
  }

  const removePokemon = (index) => {
    setPokeDex(pokeDex.filter((v, i) => i !== index));
    setPokemonCaught(pokemonCaught.filter((v, i) => i !== index));
  }

  const bulkRemovePokemon = () => {
    setPokeDex([]);
    setPokemonCaught([]);
  }

  const updateNumCaught = (index) => {
    const update = pokemonCaught.map((v, i) => {
      if(i === index) {
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
            {pokemonSuggestion.map((p, i) => <li key={i} onClick={() => setPokemonSearch(p.name)}>{p.name}</li>)}
            {/* () => navigator.clipboard.writeText(p.name) */}
          </ul>
        </>
        }
      </div>
      
      { pokeDex.length > 0 &&
        <div className="filter_box">
          <button className="btn pokemon_delete_btn" onClick={bulkRemovePokemon}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      }

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