var express =  require('express');
var router = express.Router();
var controllers = require('../controllers');
var path = require("path");

router.post("/addRecipe", (req, res) => {
    controllers.addRecipeController.addRecipe(req, res);
});
  
router.get("/posts", (req, res) => {
    controllers.postsController.getRecipes(req, res);    
});

router.put("/updatePost", (req, res) => {
    controllers.updateRecipeController.updateRecipe(req, res);    
});

router.get("/about", function (request, response) {
    response.sendFile('/about.html', { root: path.join(__dirname, "..",  "public" )});
});

module.exports = router;