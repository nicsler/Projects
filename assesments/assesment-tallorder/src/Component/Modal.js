import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowsUpDown, faWeightHanging, faHeart, faAnglesUp, faShield, faWandMagicSparkles, faShieldVirus, faShoePrints } from '@fortawesome/free-solid-svg-icons';

function Modal(props) {

    const closeModal = (e) => {
        props.parentCloseModal(false);
    }

    let statsIcon = [faHeart, faAnglesUp, faShield, faWandMagicSparkles, faShieldVirus, faShoePrints];

    return (
        <>
            <section className="modal_container">
                <div className="modal_background" onClick={closeModal}></div>
                <div className="modal">
                    <button className="btn modal_close" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></button>

                    <section className="modal_visual">
                        <div className="modal_img_container">
                            <img className="modal_img" src={props.model.sprites.front_default} />
                            <img className="modal_img_shiny" src={props.model.sprites.front_shiny} />
                        </div>                   

                        <p className="modal_name">#{props.model.order.toString().padStart(3, '0')} {props.model.name}</p>
                        <div className="modal_hw">
                            <p className="modal_height"><FontAwesomeIcon icon={faArrowsUpDown} /> {props.model.height * 0.1.toFixed(2)}m</p>
                            <p className="modal_weight"><FontAwesomeIcon icon={faWeightHanging} /> {props.model.weight * 0.1.toFixed(2)}kg</p>
                        </div>                        

                        <div className="modal_types">
                            { props.model.types.map((v, i) =>
                                <p className={`modal_type ${v.type.name}`} key={i}>{v.type.name}</p>
                            )}
                        </div>
                        <div>Abilities</div>
                        <div className="modal_abilities">                            
                            { props.model.abilities.map((v, i) =>
                                <p className="modal_ability" key={i}>{v.ability.name.replace("-"," ")}</p>
                            )}
                        </div>  
                    </section>

                    <section className="modal_data">
                        <ul className="modal_stats">
                            { props.model.stats.map((v, i) =>
                                <p key={i}><FontAwesomeIcon icon={statsIcon[i]} /> {v.stat.name.toUpperCase().replace("-"," ")}: {v.base_stat}</p>
                            )}
                        </ul>   
                    </section>
                </div> 
            </section>                       
        </>
    );
}

export default Modal;