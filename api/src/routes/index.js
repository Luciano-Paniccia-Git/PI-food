const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const diet = require( './diets')
const recipe = require( './recipe')
const recipes = require( './recipes')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', diet);
router.use('/recipes', recipes);
router.use('recipe', recipe);

module.exports = router;