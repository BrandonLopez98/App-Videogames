const { Videogame } = require('../db');

module.exports = async (id) =>{
    await Videogame.destroy({
        where: { id: id },
      })
} 