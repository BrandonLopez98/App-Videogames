const { Videogame,  Genres } = require('../db');
const findByIdApi = require('./findByIdApi')

module.exports = async (id) => {
   
    if (isNaN(id)) {
        const videogameData = await Videogame.findOne({
            where: {
              id: id
            },
            attributes: ['name', 'description', 'platforms', 'image', 'released', 'rating'],
            include: {
              model: Genres,
              attributes: ['name'],
              through: { attributes: [] },
            },
          });
        
          const videogame = {
            id: id,
            name: videogameData.name,
            image: videogameData.image,
            description: videogameData.description,
            platforms: videogameData.platforms,
            released: videogameData.released,
            rating: videogameData.rating,
            genres: videogameData.genres?.map((genre) => genre.name),
          };
      
          return videogame;
    }

    try {
        return findByIdApi(id);
    } catch (error) {
        return error.message
    }
       

   } 

