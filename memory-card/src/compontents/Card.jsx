import Purple from '../assets/Purple.jpg'
import "./Card.css";

const Card = ({card, handleCardClick, disabled}) => {

  return (
    <button className={`card ${card.matchFound ? "matched" : ""}`} disabled={disabled} onClick={handleCardClick} data-id={card.id}>
      <div className="front side">
        <img src={Purple} alt="flower" width="60" />
      </div>
      <div className="side back">{card.letter}</div>
    </button>
  )
}
export default Card;