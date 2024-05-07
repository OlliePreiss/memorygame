import Scorecard from './Scorecard'

function Nav({
  topScore,
  currentScore
 }) {
  return (
  <div className='nav-container' >
    <div className='nav-header'>
      <h2> Guessr</h2>
      <p> Can you click on all the images without double counting? </p>
    </div>
    <div className='scores'>
      <Scorecard score={topScore} text='Top Score' />
      <Scorecard score={currentScore} text='Current Score' />
    </div>
  </div>
  )
}

export default Nav;
