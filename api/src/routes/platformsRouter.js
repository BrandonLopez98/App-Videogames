const { Router } = require('express')
const getplatforms = require('../controllers/getPlatforms')
const router = Router()

router.get('/', async (req, res) =>{
    try {
        let allPlatforms = await getplatforms()
        res.status(200).send(allPlatforms)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router