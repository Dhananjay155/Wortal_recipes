const API_KEY = '69d0b8723e8446179f2e8ee1fedf7458';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true&number=9`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

export const getRandomRecipes = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/random?apiKey=${API_KEY}&number=3`
    );
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};