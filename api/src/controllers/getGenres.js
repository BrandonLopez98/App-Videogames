const { Genres } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env

module.exports = async () =>{
    let genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

    genresApi.data.results.map((genre)=>{
        Genres.findOrCreate({
            where :{
                name: genre.name
            }
        })
    })

    let genres = await Genres.findAll()
    return genres

}