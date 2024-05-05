function Card({
  src,
  card,
  handleClick
}) {


  return(
    <div className="card-container" onClick={handleClick} >
      <img src={src} />
      <h3>{card.name}</h3>
    </div>
  )
}

export default Card;
