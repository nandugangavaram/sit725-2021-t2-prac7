let Services = require('../services');

const getRecipes = (req, res) => {
    Services.recipesServices.getRecipes(res);
}

module.exports = {getRecipes};