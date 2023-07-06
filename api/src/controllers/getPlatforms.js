const { Platforms } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env

module.exports = async () =>{
    let platformsApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)

    platformsApi.data.results.map((platforms)=>{
        Platforms.findOrCreate({
            where :{
                name: platforms.name
            }
        })
    })

    let platforms = await Platforms.findAll()
    return platforms

}