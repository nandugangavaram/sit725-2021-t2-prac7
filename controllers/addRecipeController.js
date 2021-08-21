let Services = require('../services');

const addRecipe = (req, res) => {
    console.log("Add Recipe Controller");
    Services.recipesServices.insertRecipe(req, res);
}

module.exports = {addRecipe};