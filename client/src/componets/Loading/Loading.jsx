import './Loading.css'
import gif from '../../Multimedia/animation.gif'

const Loading = () => {
  return (
    <div className='content-loading'>
      <img 
        src={gif}
        alt='loading'
      />
        <div className='giro'>
          <h1>Loading ...</h1>  
        </div>

      <hr />
    </div>
  )
}

export default Loading


