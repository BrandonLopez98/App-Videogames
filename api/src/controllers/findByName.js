const { Videogame, Genres } = require('../db');
const findByNameApi = require('./findByNameApi');
const { Sequelize } = require('sequelize');

module.exports = async (name) => {
  try {
    let videogamesData = await Videogame.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: `%${name.toLowerCase()}%`,
          },
        },
        attributes: ['id', 'name', 'image', 'released', 'platforms', 'rating'],
        include: {
          model: Genres,
          attributes: ['name'],
          through: { attributes: [] },
        },
      });
    
      if (!videogamesData.length) {
        return findByNameApi(name);
      }
    
      videogamesData = videogamesData.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.image,
          platforms: game.platforms,
          released: game.released,
          rating: game.rating,
          genres: game.genres?.map((genre) => genre.name) || [],
        };
      });
    
      return videogamesData;
  } catch (error) {
    return 'That game does not exist'
  }
};
