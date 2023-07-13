import './Card.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteGame } from '../../redux/action'

const Card = ({ id,name, image, platforms, genres }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(deleteGame(id))
  }  

  return (
    <div className='card'>
      {isNaN(id) && (
       <button className='deleteButton' onClick={handleClick}>
          x
        </button>
      )}
      <Link className='decoration' to={`/detail/${id}`}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <div className='info'>
          <div>
            <p>Generos:</p>
            {genres ? genres.map((el) => {
                return (
                  <p key={el}>
                    {el}
                  </p>
                )
              }):<p>No cuenta con generos</p>}
          </div>
          <div>
            <p>Plataformas:</p>
            {platforms ? platforms.map((el) => {
                return (
                  <p key={el}>
                    {el}
                  </p>
                )
              }):<p>No cuenta con Plataformas</p>}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
