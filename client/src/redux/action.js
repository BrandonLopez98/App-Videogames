import axios from 'axios'
import { GET_GAMES,SEARCH_GAMES,GET_DETAIL,GET_GENRES,GET_PLATFORMS,POST_GAMES,DELETE_GAME,CLEAN_DETAIL,ORDER_GAMES,FILTER_GAMES_GENRES,FILTER_GAMES_PLATFORMS,FILTER_GAMES_ORIGIN,SET_BUTTONS,RESET_GAMES } from './action-types'

export const getGames = () =>{
    return async (dispatch) =>{
        const response = await axios.get('http://localhost:3001/videogame/')
        return dispatch({ type: GET_GAMES, payload: response.data })
    }
}
export const searchGames = (name) => {
    return async (dispatch) => {
      let response = await axios(`http://localhost:3001/videogame/?name=${name}`)
      return dispatch({ type: SEARCH_GAMES, payload: response.data })
    }
}
export const getDetail = (id) => {
    return async (dispatch) => {
        const response = await axios(`http://localhost:3001/videogame/${id}`)
        return dispatch({ type: GET_DETAIL, payload: response.data })
    }
}
export const getGenres = () => {
    return async (dispatch) => {
      let response = await axios('http://localhost:3001/genres')
      return dispatch({ type: GET_GENRES, payload: response.data })
    }
}
export const getPlatforms = () => {
    return async (dispatch) => {
      let response = await axios('http://localhost:3001/platforms')
      return dispatch({ type: GET_PLATFORMS, payload: response.data })
    }
}
export const postGames = (payload) => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:3001/videogame/', payload);
        dispatch({ type: POST_GAMES, payload: response.data });
    }
}  
export const deleteGame = (id) => {
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/videogame/${id}`)
      dispatch({ type: DELETE_GAME, payload: id })
    }
}
export const cleanDetail = () => {
    return { type: CLEAN_DETAIL }
}
export const orderGames = (payload) => {
    return { type: ORDER_GAMES, payload }
}
export const filterGameGenres = (payload) => {
    return { type: FILTER_GAMES_GENRES, payload }
}
export const filterGamePlatforms = (payload) => {
    return { type: FILTER_GAMES_PLATFORMS, payload }
}
export const filterGamesOrigin = (payload) => {
    return { type: FILTER_GAMES_ORIGIN, payload }
}
export const setButtons = (payload) => {
    return { type: SET_BUTTONS, payload }
}
export const resetGames = () => {
    return { type: RESET_GAMES }
}  


