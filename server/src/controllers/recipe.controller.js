const axios = require('axios');
const User = require('../model/user.model');

const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        query,
        number: 12
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

const getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe details', error: error.message });
  }
};

const saveRecipe = async (req, res) => {
  try {
    const { recipeId, title, image } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recipeExists = user.savedRecipes.find(recipe => recipe.recipeId === recipeId);
    if (recipeExists) {
      return res.status(400).json({ message: 'Recipe already saved' });
    }

    user.savedRecipes.push({ recipeId, title, image });
    await user.save();

    res.json({ message: 'Recipe saved successfully', recipe: { recipeId, title, image } });
  } catch (error) {
    res.status(500).json({ message: 'Error saving recipe', error: error.message });
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved recipes', error: error.message });
  }
};

module.exports = {
  searchRecipes,
  getRecipeDetails,
  saveRecipe,
  getSavedRecipes
};