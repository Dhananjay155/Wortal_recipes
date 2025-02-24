import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="text-center text-gray-500">No saved recipes yet</p>
      ) : (
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
                <div className="flex justify-between items-start">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {recipe.title}
                  </Link>
                  <button
                    onClick={() => removeRecipe(recipe.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes;