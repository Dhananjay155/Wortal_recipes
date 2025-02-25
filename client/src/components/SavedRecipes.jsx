import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    setSavedRecipes(recipes);
  }, []);

  const removeRecipe = (id) => {
    const updated = savedRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('savedRecipes', JSON.stringify(updated));
    setSavedRecipes(updated);
  };

  if (savedRecipes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Saved Recipes</h1>
        <p className="text-gray-600 mb-6">You haven't saved any recipes yet.</p>
        <Link
          to="/"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Explore Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Saved Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
                <button
                  onClick={() => removeRecipe(recipe.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Ready in {recipe.readyInMinutes} minutes • {recipe.servings} servings
              </p>
              <Link
                to={`/recipe/${recipe.id}`}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedRecipes;