let Services = require('../services');

const getRecipes = (req, res) => {
    console.log("Posts Recipe Controller");
    Services.recipesServices.getRecipes(res);
}

module.exports = {getRecipes};