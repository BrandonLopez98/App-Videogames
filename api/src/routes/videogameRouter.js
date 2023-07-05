const express = require('express')
const router = express.Router()

const findByName = require('../controllers/findByName')
const getAllApi = require ('../controllers/getAllApi')
const getAll = require('../controllers/getAll')

const findById = require('../controllers/findById')

const post = require('../controllers/post')


router.get('/', async (req,res)=>{
    try {

        let {name} = req.query

        if (name) {
            let gameByName = await findByName(name)
            res.status(200).send(gameByName)
        }
        else{
            let videogame = await getAll()
            let videogameApi = await getAllApi();
            res.status(200).send([...videogame,...videogameApi])
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params
        let findId = await findById(id)
        res.status(200).send(findId)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/',async (req,res)=>{
    let {name, description, platforms, released, rating, genres} = req.body

   try {
    if (!name || !description || !platforms || !released || !rating || !genres) {
        throw new Error ('Please complete the required information.')    
    }

    post(name, description, platforms, released, rating, genres)
    res.status(200).send(`the game ${name} created successfully!`)

   } catch (error) {
        return { error: error.message }
   }

})






module.exports = router
