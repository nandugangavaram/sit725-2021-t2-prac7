let client = require('../dbConnect');
var projectsCollection;
let collection = "Recipes";
projectsCollection = client.mongodbClient.db().collection(collection);

const insertRecipe = (post, callback) => {
    projectsCollection.insertOne(post, callback);
}

const getRecipes = (callback) => {    
    console.log("Get Recipes Services");
    projectsCollection.find().toArray(callback);
}

module.exports = {
    insertRecipe, getRecipes
}