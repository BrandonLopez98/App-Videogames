import { GET_GAMES,SEARCH_GAMES } from './action-types'
  
  const initialState = {
    games: [],
    allGames: [],
    // details: [],
    // types: [],
    filter: [],
    // bar: true,
    // buttons: [],
  }
  
  const reducer = (state = initialState, {type,payload}) => {

    switch (type) {
        case GET_GAMES:
            if (payload.length === state.allGames.length && state.allGames.length > 0) {
              return {
                ...state,
                allGames: payload,
              }
            }
            return {
              ...state,
              games: payload,
              allPokemons: payload,
              filter: payload,
            }
      
  
      default:
        return { ...state }
    }
  }
  
  export default reducer
  