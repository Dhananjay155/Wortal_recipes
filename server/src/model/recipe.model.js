const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    summary: { type: String },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    nutrition: { type: Object },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } 
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
