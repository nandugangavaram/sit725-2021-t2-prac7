const Recipes = require('../models/Recipes')

//inserting Recipe to DB function
const insertRecipe = (req, res) => {
    var recipe = req.body;
    const newRecipe = new Recipes(recipe);
    newRecipe.save()
    .then((err, result) => {
        if(err) {
        res.json({status: 400, message:err});
        } else {
        res.json({statusCode: 200, message:"Recipe Successfully added", data: result});
        }
    })    
    .catch(err => console.log(err));
}

//Get Recipes from DB function
const getRecipes = (req, res) => {    
    Recipes.find({})
        .then(records => {
            if(!records) {
                res.json({status: 400, message:"No Recipes Found!"});
            } else {
                res.json({statusCode: 200, message:"Success", data: records});
            }
        })        
        .catch(err => console.log(err));
}

//Update Recipe Service
const updateRecipeService = (req, res) => {
    let { id, brief_description, description, video_url } = req.body;
    Recipes.findOneAndUpdate({_id: id}, {$set: { brief_description, description, video_url}})
        .then(records => {
            if(!records) {
                res.json({status: 400, message:"No Recipes Found!"});
            } else {
                res.json({statusCode: 200, message:"Success", data: records});
            }
        })        
        .catch(err => console.log(err));
}

//Delete Recipe Service
const deleteRecipeService = (req, res) => {    
    let { id } = req.body;
    Recipes.deleteOne({_id: id})
        .then(records => {
            if(!records) {
                res.json({status: 400, message:"No Recipes Found!"});
            } else {
                res.json({statusCode: 200, message:"Success", data: records});
            }
        })        
        .catch(err => console.log(err));
}

module.exports = {
    insertRecipe, 
    getRecipes,
    updateRecipeService,
    deleteRecipeService
}