import axios from 'axios'
import { GET_GAMES,SEARCH_GAMES } from './action-types'

export const getGames = () =>{
    return async (dispatch) =>{
        const response = await axios.get('http://localhost:3001/videogame/')
        return dispatch({ type: GET_GAMES, payload: response.data })
    }
}


export const searchPokemon = (name) => {
    return async (dispatch) => {
      let response = await axios(`http://localhost:3001/videogame/?name=${name}`)
      return dispatch({ type: SEARCH_GAMES, payload: response.data })
    }
  }