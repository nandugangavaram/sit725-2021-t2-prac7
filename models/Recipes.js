const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Recipes Schema Schema
const RecipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brief_description: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: true
    }
})


const Recipes = mongoose.model('Recipes',RecipesSchema)

module.exports = Recipes