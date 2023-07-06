const { Videogame, Genres, Platforms } = require('../db');
const findByNameApi = require('./findByNameApi');
const { Sequelize } = require('sequelize');

module.exports = async (name) => {

    let videogamesData = await Videogame.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: `%${name.toLowerCase()}%`,
          },
        },
        attributes: ['id', 'name', 'image'],
        include: [
          {
            model: Genres,
            attributes: ['name'],
            through: { attributes: [] },
          },
          {
            model: Platforms,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      });
    
      if (!videogamesData.length) {
        return findByNameApi(name);
      }
    
      videogamesData = videogamesData.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.image,
          platforms: game.platforms?.map((platform) => platform.name) || [],
          genres: game.genres?.map((genre) => genre.name) || [],
        };
      });

      let findApi = await findByNameApi(name);
    
      return [...videogamesData,...findApi];

  
};

  