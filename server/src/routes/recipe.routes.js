const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
  searchRecipes,
  getRecipeDetails,
  saveRecipe,
  getSavedRecipes
} = require('../controllers/recipe.controller');

router.get('/search', searchRecipes);
router.get('/:id', getRecipeDetails);
router.post('/save', authMiddleware, saveRecipe);
router.get('/saved', authMiddleware, getSavedRecipes);

module.exports = router;
