import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import Card from './components/cards/Card'
import Nav from './components/nav/Nav'
import cardTestData from './components/testdata/cardtestdata'
import './App.css'

function App() {
  const [topScore, setTopScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [cardData, setCardData] = useState(cardTestData);



  function resetCards() {
    const arr = cardData.map((card) => {
      return {
        ...card,
        guessed: false
      }
    })
    setCardData(arr)
  }

  // useEffect(() => {
  //   // const fetchData = fetch(`https://api.giphy.com/v1/stickers/trending?api_key=U9WY8QNPaBQStZ4urD9zS8H2ZQZPxHQ5&limit=10`)
  //   // .then(function(response) {
  //   //   return response.json()
  //   // })
  //   // .then(function(response) {
  //   setCardData(response.data)
  //   // })
  //   // .catch(function(err) {
  //   //   console.log(`Bad vibe: ${err}`)
  //   // })

  // }, [])


  function handleClick(e) {
    let reset = false
    const target = e.target.closest('.card-container').lastElementChild.textContent;

    const arr = cardData.map((card) => {
      if (card.name === target) {
        if (card.guessed) {
          (currentScore > topScore) && setTopScore(currentScore);
          setCurrentScore(0)
          reset = true
          return {
            ...card,
            guessed: true
          }
        } else {
          setCurrentScore(currentScore + 1)
          return {
            ...card,
            guessed: true
          }
        }
      } else {
        return {
          ...card
        }
      }
    })

    if (reset === true) {
      resetCards()
    } else {
      setCardData(arr)
    }
  }

  function shuffleCards() {
    const shuffledArray = cardData.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return(
      shuffledArray.map((card) =>
        <Card src={viteLogo} card={card} handleClick={handleClick} />
      )
    )
  }

  return (
    <>
      <Nav src={viteLogo} topScore={topScore} currentScore={currentScore} />
      <div className='container'>
        {shuffleCards()}
      </div>
    </>
  )
}

export default App
