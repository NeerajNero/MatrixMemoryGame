import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [score, setScore] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const imageData = [
    {imgSrc: '/img/1.jpg', name: "ballDesign", matched: false},
    {imgSrc: '/img/2.jpg', name: "table", matched: false},
    {imgSrc: '/img/3.jpg', name: "ring", matched: false},
    {imgSrc: '/img/4.jpg', name: "candle", matched: false},
    {imgSrc: '/img/5.jpg', name: "guitar", matched: false},
    {imgSrc: '/img/6.jpg', name: "dustbin", matched: false},
    {imgSrc: '/img/7.jpg', name: "ribbons", matched: false},
    {imgSrc: '/img/8.jpg', name: "animal", matched: false}
  ]
  const shuffleCards = () => {
    const shuffleCards = [...imageData, ...imageData].sort(() => Math.random() - 0.5).map((card) => ({...card, id: Math.random()}))
    setCards(shuffleCards)
  }
  useEffect(() => {
    shuffleCards()
    setScore(0)
    setTurns(0)
  },[])
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
    if(choiceOne.name === choiceTwo.name){
      setScore((prevValue) => prevValue + 1)
      setCards((prevValue) => {
        return (prevValue.map((card) => {
        if(card.name === choiceOne.name){
          return {...card, matched: true}
        }else{
          return card
        }
      }))
      })
      resetTurn();
    }else{
      setTimeout(() => resetTurn(), 1000);
    }
  }
  },[choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  }
  const handleChoice = (card) => {
      {choiceOne ? setChoiceTwo(card) : setChoiceOne(card)}
  }
  console.log(choiceOne, choiceTwo)
  console.log(score)
  return (
    <>
    <div className='container text-center d-flex justify-content-between my-3'>
        <p>Score: {score}</p>
        <button onClick={shuffleCards}>New Game</button>
        <p>Turns: {turns}</p>
        
    </div>
    <section className='container'>
          {cards.map((card,i) => (<div key={i} className={`card ${card === choiceOne || card === choiceTwo || card.matched ? "toggleCard" : ""}`} onClick={() => !disabled && !card.matched && handleChoice(card)}><img className='face' src={card.imgSrc} key={i}/><div className='back'></div></div>))}
    </section>
    </>
  )
}

export default App
