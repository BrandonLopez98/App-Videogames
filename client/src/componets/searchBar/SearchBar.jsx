import './SearchBar.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { searchGames } from '../../redux/action'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleInputChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(searchGames(name))
    setName('')
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleSubmit(event)
    }
  }

  return (
    <div className='buscador'>
            <button
        type='submit'
        onClick={(event) => handleSubmit(event)}
      >
      </button>
      <input
        type='text'
        placeholder='Busca tu juego'
        onChange={(event) => handleInputChange(event)}
        onKeyDown={(event) => handleKeyDown(event)}
        value={name}
      />
    </div>
  )
}

export default SearchBar
