import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

const RecipeCard = ({ recipe }) => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const saveRecipe = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      await axios.post('http://localhost:5000/api/recipes/save', {
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{recipe.title}</h3>
        <div className="flex justify-between items-center">
          <Link 
            to={`/recipe/${recipe.id}`}
            className="text-indigo-600 hover:text-indigo-800"
          >
            View Details
          </Link>
          {user && (
            <button
              onClick={saveRecipe}
              disabled={isSaving}
              className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
