const express = require('express')
const router = express.Router()

const findByName = require('../controllers/findByName')
const getAllApi = require ('../controllers/getAllApi')
const getAll = require('../controllers/getAll')

const findById = require('../controllers/findById')

const post = require('../controllers/post')
const postArray = require('../controllers/postAllay')

const delate = require('../controllers/delate')


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
            res.status(200).send([...videogameApi,...videogame])
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

router.post('/', async (req, res) => {
    let { name, description, platforms, released, rating, genres } = req.body;

    try {
        if (Array.isArray(req.body)) {
            postArray(req.body);
            res.status(200).send('Array posted successfully!');
        } else if (!name || !description || !platforms || !released || !rating || !genres) {
            throw new Error('Please complete the required information.');
        } else {
            post(name, description, platforms, released, rating, genres);
            res.status(200).send(`The game ${name} was created successfully!`);
        }
    } catch (error) {
        return { error: error.message };
    }
});


router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    try {
        await delate(id)
        res.status(200).json('Game Deleted')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})






module.exports = router
