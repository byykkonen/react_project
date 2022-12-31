import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
import Card from './compontents/Card'


function App() {
  const [cards, setCards] = useState(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const items = [
  {
    letter: "A",
    id: "1",
    matchFound: false,
    flipped: false,
  },
  {
    letter: "B",
    id: "2",
    matchFound: false,
    flipped: false,
  },
  {
    letter: "C",
    id: "3",
    matchFound: false,
    flipped: false,
  },
  {
    letter: "D",
    id: "4",
    matchFound: false,
    flipped: false,
  },
  {
    letter: "E",
    id: "5",
    matchFound: false,
    flipped: false,
  },
  {
    letter: "F",
    id: "6",
    matchFound: false,
    flipped: false,
  },
  {
    letter: "G",
    id: "7",
    matchFound: false,
    flipped: false,
  },
 {
   letter: "H",
   id: "8",
   matchFound: false,
   flipped: false,
 }
];

  function resetCards(){
    const shuffled = [...items,...items]
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, key: Math.random()}))
    setCards(shuffled)
  }

  function handleCardClick(e){
    firstSelection
      ? setSecondSelection(e.target.dataset.id)
      : setFirstSelection(e.target.dataset.id);
    // to do: handle duplicated single card click
  }

  function resetTurn(){
    setFirstSelection(null);
    setSecondSelection(null);
    setMoves(m => m + 1);
    setDisabled(false)
  }

  function handleNewGameClick(){
    resetTurn();
    setMoves(0);
    setScore(0);
    resetCards()
  }


  useEffect(() => {
    if(!secondSelection){return}
    setDisabled(true)
    if(firstSelection === secondSelection){
      setCards(prev => {
        return prev.map(card => {
          if(card.id === firstSelection){
            return {...card, matchFound: true}
          } else {
            return card;
          }
        })
      })
      setScore(prev => prev + 1);
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }, [firstSelection, secondSelection])

  useEffect(() => {
    resetCards()
  }, [])

  return (
    <div className="App">
      <button onClick={() => handleNewGameClick()}>New Game</button>
      <p>Total Moves: {moves}  Total Score: {score}</p>
      <div className="gameboard">
        {
          cards && (
            Object.values(cards).map((card)=> <Card
              key={card.key}
              card={card}
              disabled={disabled}
              handleCardClick={handleCardClick}/>)
          )
        }
      </div>
    
    </div>
  )
}



export default App;

