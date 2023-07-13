import './Home.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import { getGenres, getPlatforms, getGames, filterGamesOrigin, orderGames, filterGameGenres, filterGamePlatforms } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import Loading from '../Loading/Loading'


const HomePage = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    dispatch(getGames());
  }, []);

  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const allGames = useSelector((state) => state.games);

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  // Obtener el índice del primer y último juego de la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  // Obtener los juegos de la página actual
  const games = allGames.slice(indexOfFirstGame, indexOfLastGame);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterOrigin = (event) =>{
    dispatch(filterGamesOrigin(event.target.value))
  }

  const order = (event) => {
    dispatch(orderGames(event.target.value))
  }

  const filterGender = (event) =>{
    dispatch(filterGameGenres(event.target.value))
  }

  const filterPlataforms = (event) =>{
    dispatch(filterGamePlatforms(event.target.value))
  }

  return (
    <div className='content-app'>
        <div className='conten'>
        <div className='selectores'>
                <SearchBar />
          <div>
          <select onChange={filterOrigin}>
                <option value='all'>Mostar Todos</option>
                <option value='database'>Creados por mi</option>
                <option value='api'>Creados por la api</option>
            </select>
          </div>

          <div>
            <select onChange={order}>
                <option key='id' value='id'> Ordenar por id </option>
                <option key='ascendingName' value='ascendingName'>Ordenar por nombre A-Z </option>
                <option key='descendingName' value='descendingName'>Ordenar por nombre Z-A </option>
            </select>
          </div>

        <div>
          <select onChange={filterGender}>
                <option value='all'>Todos los Generos</option>
                {genres.map((item,index)=>{
                  return( <option key={index} value={item.name}> {item.name} </option>)
                })}
            </select>
        </div>

          <div>
            <select onChange={filterPlataforms}>
                <option value='all'>Todos las Plataformas</option>
                {platforms.map((item,index)=>{
                  return( <option key={index} value={item.name}> {item.name} </option>)
                })}
            </select>
          </div>
          <div>
          <div className='pagination'>

          {allGames.length > gamesPerPage &&
            Array(Math.ceil(allGames.length / gamesPerPage))
              .fill()
              .map((_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              ))}

        </div>
        </div>
        </div>
      </div>

      <div className='content-card'>
      
        {games.length ? games.map((game) => (
          <Card
            key={game.id}
            id={game.id}
            name={game.name}
            image={game.image}
            platforms={game.platforms}
            genres={game.genres}
          />
        )):<Loading/>
        
        }
      </div>     
    </div>
  )
}

export default HomePage
