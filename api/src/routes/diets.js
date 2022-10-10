const express = require('express');
const router = express.Router()
const { Diet } = require ('../db');

router.get('/', async (req, res) => {
    try {
        let typesDiet = await Diet.findAll();
        res.status(200).json(typesDiet)
    }catch (error) {
        res.status(400).send(error)
    }
})
//http://localhost:3001/types

module.exports = router;