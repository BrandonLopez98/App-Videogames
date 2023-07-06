const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRouter = require('./genresRouter')
const platformsRouter = require('./platformsRouter')
const videogameRouter = require('./videogameRouter')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame',videogameRouter)
router.use('/genres',genresRouter)
router.use('/platforms',platformsRouter)

module.exports = router;
