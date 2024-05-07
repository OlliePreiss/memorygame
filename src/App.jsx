import { useState, useEffect } from 'react'
import Card from './components/cards/Card'
import Nav from './components/nav/Nav'
import cardTestData from './components/testdata/cardtestdata'
import './App.css'

function App() {
  const [topScore, setTopScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [gifs, setGifs] = useState(cardTestData);

  function resetCards() {
    const arr = gifs.map((gif) => {
      return {
        ...gif,
        guessed: false
      }
    })
    setGifs(arr)
  }

  useEffect(() => {
    const fetchData = fetch(`https://api.giphy.com/v1/stickers/trending?api_key=U9WY8QNPaBQStZ4urD9zS8H2ZQZPxHQ5&limit=10`, {
      mode: 'cors'
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      const gifs = response.data.map((gif) => {
        return {
          url: gif.images.fixed_height.url,
          guessed: false
        }
      })
      setGifs(gifs)
    })
    .catch(function(err) {
      console.log(`Bad vibe: ${err}`)
    })
  }, [])

  function handleClick(e) {
    let reset = false
    const target = e.target.closest('.card-container').firstElementChild.src;

    const arr = gifs.map((gif) => {
      if (gif.url === target) {
        if (gif.guessed) {
          (currentScore > topScore) && setTopScore(currentScore);
          setCurrentScore(0)
          reset = true
          return {
            ...gif,
            guessed: true
          }
        } else {
          setCurrentScore(currentScore + 1)
          return {
            ...gif,
            guessed: true
          }
        }
      } else {
        return {
          ...gif
        }
      }
    })

    if (reset === true) {
      resetCards()
    } else {
      setGifs(arr)
    }
  }

  function shuffleCards() {
    const shuffledArray = gifs.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return(
      shuffledArray.map((card) =>
        <Card card={card} handleClick={handleClick} />
      )
    )
  }

  return (
    <>
      <Nav topScore={topScore} currentScore={currentScore} />
      <div className='placeholder'>
      </div>
      <div className='container'>
        {shuffleCards()}
      </div>
    </>
  )
}

export default App
