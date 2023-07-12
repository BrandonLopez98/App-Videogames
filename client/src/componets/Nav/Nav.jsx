import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetGames, setButtons } from '../../redux/action';
import creajuego from '../../Multimedia/gamerecurso-4-min.webp'
import inicio from '../../Multimedia/gamerecurso-5-min.webp'
import sobremi from '../../Multimedia/gamerecurso-6-min.webp'
import cerrarsecion from '../../Multimedia/gamerecurso-8-min.webp'

const Nav = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetGames());
    dispatch(setButtons(['all', 'all', 'id']));
  };

  return (
    <div className="nav">
      <Link to="/">
          <img onClick={handleClick} src={cerrarsecion} alt="" />
        </Link>

        <Link to="/create">
          <img src={creajuego} alt="" />
        </Link>

        <Link to="/home">
          <img onClick={handleClick} src={inicio} alt="" />
        </Link>

        <Link to="/about">
          <img src={sobremi} alt="" />
        </Link>

    </div>
  );
};

export default Nav;
