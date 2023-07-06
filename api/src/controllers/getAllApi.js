const axios = require('axios');
const { API_KEY } = process.env;

module.exports = async () => {
  let id = 1;
  let videogame = [];

  while (id <= 50) {
    try {

        let response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

        if (response.status) {

            const { id, name, background_image, platforms, genres } = response.data;

            let game = {
            id,
            name,
            image: background_image,
            platforms: platforms?.map((platform) => platform.platform.name)|| [],
            genres: genres?.map((genre) => genre.name) || [],
            };

            videogame.push(game);
        }

    } catch (error) {
        console.log(`Error en la solicitud para el ID ${id}: ${error.message}`);
    }

    id++;
}
return videogame;
}
