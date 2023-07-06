const { Videogame, Genres, Platforms } = require('../db');

module.exports = async (name, description, platforms, released, rating, genres) => {
  try {
    const random = Math.floor(Math.random() * 151 + 1);
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${random}.png`;

    const newGame = await Videogame.create({
      name: name.toLowerCase(),
      description,
      platforms,
      image,
      released,
      rating,
      genres,
    });

    const genresInDb = await Genres.findAll({ where: { name: genres } });
    await newGame.addGenres(genresInDb);

    const platformsInDb = await Platforms.findAll({ where: { name: platforms } });
    await newGame.addPlatforms(platformsInDb);

    return newGame;

  } catch (error) {
    return { error: error.message };
  }
};
