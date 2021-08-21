let client = require('../dbConnect');
var projectsCollection;
let collection = "Recipes";
projectsCollection = client.mongodbClient.db().collection(collection);

const insertRecipe = (req, res) => {
    var newRecipe = req.body;
    projectsCollection.insertOne(newRecipe, (err, result) => {
        if(err) {
        res.json({status: 400, message:err});
        } else {
        res.json({statusCode: 200, message:"Project Successfully added", data: result});
        }
    });
}

const getRecipes = (res) => {    
    console.log("Get Recipes Services");
    projectsCollection.find().toArray((err, result) => {
        if(err) {
        res.json({status: 400, message:err});
        } else {
        res.json({statusCode: 200, message:"Success", data: result});
        }
    });
}

module.exports = {
    insertRecipe, getRecipes
}