import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import imgGame from '../../Multimedia/gamerecurso-2-min.webp'
import ingresa from '../../Multimedia/gamerecurso-3-min.webp'

const LandingPage = () => {
  
  return (
    <div className="container-landing">
      <div className='text'>
        <h2>Explora un universo de juegos sin límites en GameVerse</h2>
        <h4>tu fuente definitiva para descubrir, jugar y conquistar nuevas experiencias gaming</h4>
        <Link to="/home">
          <img src={ingresa} alt="img-game" />
        </Link>
      </div>

      <div className='content-image'>
        <img src={imgGame} alt="img-game" />
      </div>
    </div>
  );
};

export default LandingPage;
