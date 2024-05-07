function Card({
  card,
  handleClick
}) {


  return(
    <div className="card-container" onClick={handleClick} >
      <img src={card.url} />
    </div>
  )
}

export default Card;
