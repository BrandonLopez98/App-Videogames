import './Detail.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDetail, cleanDetail } from '../../redux/action';

const Detail = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);


  return (
    <div>
      <div>
        <h2>Id: {details?.id}</h2>
        <h1>Nombre: {details.name}</h1>
      </div>
      <div>
        <img src={details.image} alt='' />
        <div>
          <p>Descripcion:</p>
          <p dangerouslySetInnerHTML={{ __html: details.description }}></p>
          <div>
            <p>Genero:</p>
            {details.genres &&
              details.genres.map((el) => {
                return <p key={el}>{el}</p>;
              })}
          </div>
          <div>
            <p>Plataformas:</p>
            {details.platforms &&
              details.platforms.map((el) => {
                return <p key={el}>{el}</p>;
              })}
          </div>
          <p>Fecha de lanzamiento: {details.released}</p>
          <p>Calificacion: {details.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
