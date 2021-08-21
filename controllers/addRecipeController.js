let Services = require('../services');

const addRecipe = (req, res) => {
    Services.recipesServices.insertRecipe(req, res);
}

module.exports = {addRecipe};