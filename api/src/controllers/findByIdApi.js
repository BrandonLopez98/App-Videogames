const axios = require('axios')
const { API_KEY } = process.env

module.exports = async (id) =>{
    try {
        let gamesByIdApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

        const videogame = {
            id: id,
            name: gamesByIdApi.data.name,
            image: gamesByIdApi.data.background_image,
            description: gamesByIdApi.data.description,
            platforms: gamesByIdApi.data.platforms?.map((platform) => platform.platform.name),
            genres: gamesByIdApi.data.genres?.map((genre) => genre.name),
            released: gamesByIdApi.data.released,
            rating: gamesByIdApi.data.rating,
          };

       return videogame

    } catch (error) {
        return 'That game does not exist'
    }

}