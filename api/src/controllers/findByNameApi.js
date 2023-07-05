const axios = require('axios')
const { API_KEY } = process.env

module.exports = async (name) =>{
    try {
        let gamesByNameApi = await axios.get(`https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=${API_KEY}`)

        let gamesByName = [];
        
        gamesByNameApi.data.results.map((game)=>{
            let gameDetail = {
                id:game.id,
                name:game.name,
                image:game.background_image,
                released:game.released,
                rating:game.rating,
                genres:game.genres.map((genre)=>genre.name)
            }

            gamesByName.push(gameDetail)
        })

        return gamesByName;

    } catch (error) {
        return 'That game does not exist'
    }

}