var express =  require('express');
var router = express.Router();
var controllers = require('../controllers');
var path = require("path");

router.post("/addRecipe", (req, res) => {
    console.log("ADD POST Method Routes");
    controllers.addRecipeController.addRecipe(req, res);
});
  
router.get("/posts", (req, res) => {
    console.log("GET POSTS Method Routes");
    controllers.postsController.getRecipes(req, res);    
});

router.get("/about", function (request, response) {
    console.log(__dirname);
    response.sendFile('/about.html', { root: path.join(__dirname, "..",  "public" )});
});

module.exports = router;