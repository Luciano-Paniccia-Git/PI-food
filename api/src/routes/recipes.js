const express = require('express');
const router = express.Router()
const axios = require('axios');
require ('dotenv').config();
const { Recipe, Diet } = require ('../db');
const { API_KEY } = process.env;


const getApiInfo = async () => {
    try {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const { results } =resAxios.data ;
        
        if (results.length > 0) {
            let response = await results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image, 
                    idApi: result.id, 
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
                    summary:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }        
            })
        return response;
    } 

    }catch (error) {
        console.error(error);
        return ([])
    }
}

const getDBinfo = async () => {
    try {
        const dataDB = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        let response = await dataDB?.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                score: recipe.score,
                healthScore: recipe.healthScore,
                image: recipe.image,
                steps: recipe.steps,
                diets: recipe.diets?.map(diet => diet.name),
            }
        });
   return response;
}catch (error) {
 console.error(error);
    }
}

    const getAllInfo = async () => {
        try {
            const apiInfo = await getApiInfo()
            const bdInfo = await getDBinfo()
            const infoTotal= apiInfo.concat(bdInfo)
            return infoTotal;
        }catch (error) {
            console.error(error)
        }
    }

    const getApiByName = async (name) => {
        try {
            const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
            const { results } = resAxios.data;
            if (results.length > 0) {
                let response = results?.map((result) => {
                    return {
                        name: result.title,
                        vegetarian: result.vegetarian,
                        vegan: result.vegan,
                        glutenFree: result.glutenFree,
                        dairyFree: result.dairyFree, 
                        image: result.image, 
                        idApi: result.id, 
                        score: result.spoonacularScore,
                        healthScore: result.healthScore,
                        types: result.dishTypes?.map(element => element),  
                        diets: result.diets?.map(element => element), 
                        summary:result.summary, 
                        steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                    }
                })
          return response           
        }

        else{
            console.log("NO hay coincidencia en la API");
            //return ('error');
        }

        }catch (error) {
            console.error(error);
            return ('error')
        }
    }

    const getDBByName = async (name) => {
        try {
            const DBInfo = await getDBinfo();
            const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));
               
            return filtByName;
        }catch (error) {
            return ('error')
        } 
    }
   
    const getInfoByName = async (name) => {
        try{
            const apiByName = await getApiByName(name)
            const DBByName = await getDBByName(name)
            const infoTotal = apiByName.concat(DBByName)
            return infoTotal
        }catch (error) {
            return ('error')
        }
    }  

    router.get( '/', async (req, res) => {
        const { name } = req.query

        if ( name ) {
            const infoByName = await getInfoByName(name)
            if ( infoByName !== 'error'){
                infoByName.length > 0 ? res.json(infoByName) : res.status(400).json([{ name: 'No se encontro ninguna receta' }])
            }else {
                res.status(404).json({ message: 'Error en la busqueda de datos'})
            }
        }
    })

    router.get('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            if (id.length > 12) {
                const dataDB = await Recipe.findPk(id, {
                    include: {
                        model: Diet,
                        attributes: [ 'name'],
                        through: {
                            attributes: []
                        },
                    },
                })
                if(dataDB) {
                    const obj = {
                        id: dataDB.id,
                        name: dataDB.name,
                        summary: dataDB.summary,
                        score: dataDB.score,
                        healthScore: dataDB.healthScore,
                        image: dataDB.image,
                        steps: dataDB.steps,
                        diets: dataDB.diets?.map(diet => diet.name)
                    }
                        res.json(obj)
                    }else{
                        console.log('bd')
                        const objerr = {
                            name: 'Recipe not Found',
                            summary: 'None',
                            score: 0,
                            healthScore: 0,
                            image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
                            steps: 'none',
                            diets: []
                        }
                        res.json(objerr)
                    }
                }else {
                    const resAxios = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
                    const {result} = resAxios.data;
                    let obj = {};
        
                    obj = {
                        name: result.title, 
                        vegetarian: result.vegetarian,
                        vegan: result.vegan,
                        glutenFree: result.glutenFree,
                        dairyFree: result.dairyFree,
                        image: result.image, 
                        idApi: result.id, 
                        score: result.spoonacularScore, 
                        healthScore: result.healthScore, 
                        diets: result.diets?.map(element => element),types: result.dishTypes?.map(element => element), 
                        summary:result.summary, 
                        steps: result.instructions
                       }
                       if (obj) {
                        res.json(obj)
                       }else {
                        let objerrors 
                        objerrors = {
                            name: 'Recipe not Found', 
                            image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
                            score: 0, 
                            healthScore: 0, 
                            diets: [], 
                            summary:'none', 
                            steps: 'none'}
        
                        res.json(objerrors)
                    }
                }
        }catch (e) {
            let objerr
        
            objerr = {name: 'Solo ingrese números menores a 100000 o código UUID', 
            image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
            score: 0, 
            healthScore: 0, 
            diets: [], 
            summary:'none', 
            steps: 'none'}
    
        res.json(objerr)
        }
    })

    module.exports = router;