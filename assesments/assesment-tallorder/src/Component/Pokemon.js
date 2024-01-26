import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";

function Pokemon(props) {
    const [showModal, setShowModal] = useState();

    const closeModal = (e) => {
        setShowModal(-1);
    }

    const updateNumCaught = (index) => {
        props.parentUpdateNumCaught(index);
    }

    const onDelete = (index) => {
        props.parentRemovePokemon(index);
    }

    return (
        <>
            <section className="pokedex_grid">
                { props.model.map((v, i) => 
                    <div key={i} className="pokemon_container">

                        <div className="pokemon_image_container">
                            <img src={v.sprites.front_default} />
                        </div>                        
                        
                        <div className="pokemon_name">
                            <p>{v.name}</p>
                            <button className="btn pokemon_details_btn" onClick={() => setShowModal(i)}><FontAwesomeIcon icon={faEye} /></button>
                        </div>                        

                        <div className="pokemon_caught">
                            <p>Caught: {props.numCaught[i]}</p>
                            <button className="btn pokemon_update_btn" onClick={() => updateNumCaught(i)}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>                        
                        
                        <button className="btn pokemon_delete_btn" onClick={() => onDelete(i)}><FontAwesomeIcon icon={faTrash} /></button>

                        { showModal === i &&
                            <Modal model={v} parentCloseModal={closeModal} />
                        }                    
                    </div>                
                )}
            </section>            
        </>
    );
}

export default Pokemon;