const { Videogame, Genres } = require('../db');

module.exports = async () => {
  let videogamesData = await Videogame.findAll({
    attributes: ['id', 'name', 'image', 'released', 'platforms', 'rating'],
    include: {
      model: Genres,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

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
};
