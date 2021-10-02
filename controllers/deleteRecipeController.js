let Services = require('../services');

const deleteRecipe = (req, res) => {
    Services.recipesServices.deleteRecipeService(req, res);
}

module.exports = {deleteRecipe};