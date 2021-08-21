let Services = require('../services');

const getRecipes = (req, res) => {
    console.log("Posts Recipe Controller");
    Services.recipesServices.getRecipes((err, result) => {
        if(err) {
        res.json({status: 400, message:err});
        } else {
        res.json({statusCode: 200, message:"Success", data: result});
        }
    });
}

module.exports = addRecipe;