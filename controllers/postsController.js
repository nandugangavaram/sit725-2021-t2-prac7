let Services = require('../services');

const getRecipes = (req, res) => {
    Services.recipesServices.getRecipes(req, res);
}

module.exports = {getRecipes};