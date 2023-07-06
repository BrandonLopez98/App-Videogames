const { Videogame, Genres, Platforms } = require('../db');

module.exports = async () => {
  let videogamesData = await Videogame.findAll({
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

  videogamesData = videogamesData.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.image,
      platforms: game.platforms?.map((platform) => platform.name) || [],
      genres: game.genres?.map((genre) => genre.name) || [],
    };
  });

  return videogamesData;
};
