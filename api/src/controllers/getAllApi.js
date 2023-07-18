const axios = require('axios');
const { API_KEY } = process.env;

module.exports = async () => {
  let count = 1;
  let videogame = [];

  const requests = [];

  while (count <= 200) {
    requests.push(
      axios.get(`https://api.rawg.io/api/games/${count}?key=${API_KEY}`)
        .then(response => {
          if (response.status === 200) {
            const { id, name, background_image, platforms, genres } = response.data;

            let game = {
              id,
              name,
              image: background_image,
              platforms: platforms?.map((platform) => platform.platform.name) || [],
              genres: genres?.map((genre) => genre.name) || [],
            };

            videogame.push(game);
          }
        })
        .catch(error => {
          console.log(`Error en la solicitud para el ID ${count}: ${error.message}`);
        })
    );

    count++;
  }

  await Promise.all(requests);

  return videogame;
};


// const axios = require('axios');
// const { API_KEY } = process.env;

// module.exports = async () => {
//   let count = 1;
//   let videogame = [];

//   while (count <= 50) {
//     try {

//         let response = await axios.get(`https://api.rawg.io/api/games/${count}?key=${API_KEY}`);

//         if (response.status) {

//             const { id, name, background_image, platforms, genres } = response.data;

//             let game = {
//             id,
//             name,
//             image: background_image,
//             platforms: platforms?.map((platform) => platform.platform.name)|| [],
//             genres: genres?.map((genre) => genre.name) || [],
//             };

//             videogame.push(game);
//         }

//     } catch (error) {
//         console.log(`Error en la solicitud para el ID ${count}: ${error.message}`);
//     }

//     count++;
// }
// return videogame;
// }
