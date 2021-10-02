let Services = require('../services');

const updateRecipe = (req, res) => {
    Services.recipesServices.updateRecipeService(req, res);
}

module.exports = {updateRecipe};