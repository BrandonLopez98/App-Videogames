import { GET_GAMES,SEARCH_GAMES,GET_DETAIL,GET_GENRES,GET_PLATFORMS,POST_GAMES,DELETE_GAME,CLEAN_DETAIL,ORDER_GAMES,FILTER_GAMES_GENRES,FILTER_GAMES_PLATFORMS,FILTER_GAMES_ORIGIN,SET_BUTTONS,RESET_GAMES } from './action-types'
  
  const initialState = {
    games: [],
    allGames: [],
    details: [],
    genres: [],
    platforms: [],
    buttons: [],
  }
  
  const reducer = (state = initialState, {type,payload}) => {

    switch (type) {
        case GET_GAMES:
          return { ...state, games: [...payload], allGames: [...payload] }
        case SEARCH_GAMES:
          return { ...state, games: payload.map(game => ({ ...game })) }
        case GET_DETAIL:
          return { ...state, details: payload }      
        case GET_GENRES:
          return { ...state, genres: payload }
        case GET_PLATFORMS:
          return { ...state, platforms: payload }
        case POST_GAMES:
          return { ...state, games: [...state.games, payload] }
        case DELETE_GAME:
          return {...state,
              games: state.games.filter((game) => game.id !== payload),
              allGames: state.allGames.filter((game) => game.id !== payload)}
        case ORDER_GAMES:
          let allgame = [...state.allGames]
          let sortedGames
          switch (payload) {
              case 'id':
              sortedGames = [
                  ...allgame.filter((item) => typeof item.id === 'number').sort((a, b) => a.id - b.id),
                  ...allgame.filter((item) => typeof item.id !== 'number').sort((a, b) => a.id.localeCompare(b.id))
              ]
              break
              case 'ascendingName':
                sortedGames = allgame.sort((a, b) => a.name.localeCompare(b.name))
                break
              case 'descendingName':
                sortedGames = allgame.sort((a, b) => b.name.localeCompare(a.name))
                break
              default:
                sortedGames = allgame
            }
          return { ...state, games: sortedGames }
        case FILTER_GAMES_GENRES:
          const allGames = [...state.allGames];
          let filteredGames = payload === 'all' ? allGames : allGames.filter(item => item.genres && item.genres.includes(payload));
          !filteredGames.length && (filteredGames = ['No hay juegos con ese género']);
          return { ...state, games: filteredGames };
        case FILTER_GAMES_PLATFORMS:
          const allGamess = [...state.allGames]
          let filteredGamess = payload === 'all'? allGamess: allGamess.filter((item) => item.platforms && item.platforms.includes(payload))
          !filteredGamess.length && (filteredGamess = ['No hay juegos con esa plataforma'])
          return {...state, games: filteredGamess}
        case FILTER_GAMES_ORIGIN:
          const allggames = [...state.allGames];
          const originFilter = payload === 'database' ? allggames.filter(item => typeof item.id !== 'number') :
            payload === 'api' ? allggames.filter(item => typeof item.id === 'number') : [...state.allGames];
          const games = payload === 'all' ? allggames : originFilter;
          return { ...state, games: games }          
        case CLEAN_DETAIL:
          return { ...state, details: [] }
        case SET_BUTTONS:
          return { ...state, buttons: payload }
        case RESET_GAMES:
          return { ...state, games: state.allGames }
       


  
      default:
        return { ...state }
    }
  }
  
  export default reducer
  