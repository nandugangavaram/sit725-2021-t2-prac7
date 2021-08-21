let client = require('dbConnect');

const insertRecipe = (post, callback) => {
    client.projectCollection.insertOne(post, callback);
}

const getRecipes = (callback) => {
    client.projectCollection.find().toArray(callback);
}

module.exports = {
    insertRecipe, getRecipes
}