var express =  require('express');
var router = express.Router();
var controllers = require('../controller');

router.post("/addRecipe", (req, res) => {
    controllers.AddRecipeController.addRecipe(req, res);
    // var newRecipe = req.body;
    // insertRecipe(newRecipe, (err, result) => {
    //     if(err) {
    //     res.json({status: 400, message:err});
    //     } else {
    //     res.json({statusCode: 200, message:"Project Successfully added", data: result});
    //     }
    // });
});
  
router.get("/posts", (req, res) => {
    controllers.AddRecipeController.getRecipes(req, res);
    // getRecipes((err, result) => {
    //     if(err) {
    //     res.json({status: 400, message:err});
    //     } else {
    //     res.json({statusCode: 200, message:"Success", data: result});
    //     }
    // });
});

module.exports = router;