const { Router } = require('express')
const getGenres = require('../controllers/getGenres')
const router = Router()

router.get('/', async (req, res) =>{
    try {
        let allGenres = await getGenres()
        res.status(200).send(allGenres)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router