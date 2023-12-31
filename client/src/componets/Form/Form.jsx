import './Form.css'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, getPlatforms, postGames } from '../../redux/action';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import crearJuego from '../../Multimedia/gamerecurso-10-min.webp'
const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);
  const history = useHistory();
  const platforms = useSelector(state => state.platforms);
  const { register, handleSubmit,watch } = useForm();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const onSubmit = (data) => {
    const selectedGenreNames = selectedGenres.map(genreId => {
      const genre = genres.find(genre => genre.id === genreId);
      return genre.name;
    });
    const selectedPlatformNames = selectedPlatforms.map(platformId => {
      const platform = platforms.find(platform => platform.id === platformId);
      return platform.name;
    });
    const formData = { ...data, genres: selectedGenreNames, platforms: selectedPlatformNames };
    dispatch(postGames(formData));
    history.push('/home');
  }
  

  const handleGenresChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedGenres(prevGenres => [...prevGenres, ...selectedOptions]);
  }
  
  const handleDeleteGenre = (genreId) => {
    setSelectedGenres(prevGenres => prevGenres.filter(id => id !== genreId));
  }

  const handlePlatformsChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedPlatforms(prevPlatforms => [...prevPlatforms, ...selectedOptions]);
  }
  
  const handleDeletePlatform = (platformId) => {
    setSelectedPlatforms(prevPlatforms => prevPlatforms.filter(id => id !== platformId));
  }

  return (
    <div>
      <form className='contain-form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input type="text" {...register('name')} />
        </div>

        <div>
          <label>Descripción</label>
          <input type="text" {...register('description')} />
        </div>

        <div className='flex'>
        <div className='conten-1'>
          <label>Fecha de lanzamiento</label>
          <input type="date" {...register('released')} />
        </div>

        <div className='conten-1 Calificacion'>
          <label>Calificación</label>
          <input type="range" min="1" max="10" step="0.1" {...register('rating', { required: true, min: 1, max: 10 })} />
          <p>{watch('rating')}</p>
        </div>
        </div>

        <div className='flex'>
        <div className='content-2'>
          <label>Géneros</label>
          <select {...register('genres', { required: true })} onChange={handleGenresChange}>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <div className='inputGenres'>
            {selectedGenres.map(genreId => {
              const genre = genres.find(genre => genre.id === genreId);
              return (
                <div className='option-genres' key={genreId}>
                  <p>{genre.name}</p>
                  <button onClick={() => handleDeleteGenre(genreId)}>x</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className='content-2'>
          <label>Plataformas</label>
          <select {...register('platforms', { required: true })} onChange={handlePlatformsChange}>
            {platforms.map(platform => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>

          <div className='inputPlatforms'>
            {selectedPlatforms.map(platformId => {
              const platform = platforms.find(platform => platform.id === platformId);
              return (
                <div className='option-plataforms' key={platformId}>
                  <p>{platform.name}</p>
                  <button onClick={() => handleDeletePlatform(platformId)}>x</button>
                </div>
              );
            })}
          </div>
        </div>
        </div>

        <button className='botton-submit' type="submit"><img src={crearJuego} alt="" /></button>
      </form>
    </div>
  );
};

export default Form;
