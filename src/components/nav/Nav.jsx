import Scorecard from './Scorecard'

function Nav({
  src,
  topScore,
  currentScore
 }) {
  return (
  <div className='nav-container' >
    <div>
      <img src={src} alt="" />
      <p> Can you click on all the images without double counting? </p>
    </div>
    <div>
      <Scorecard score={topScore} text='Top Score' />
      <Scorecard score={currentScore} text='Current Score' />
    </div>
  </div>
  )
}

export default Nav;
