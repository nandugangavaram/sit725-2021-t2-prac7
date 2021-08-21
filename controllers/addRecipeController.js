let Services = require('../services');

const addRecipe = (req, res) => {
    console.log("Add Recipe Controller");
    var newRecipe = req.body;
    Services.recipesServices.insertRecipe(newRecipe, (err, result) => {
        if(err) {
        res.json({status: 400, message:err});
        } else {
        res.json({statusCode: 200, message:"Project Successfully added", data: result});
        }
    });
}

module.exports = addRecipe;