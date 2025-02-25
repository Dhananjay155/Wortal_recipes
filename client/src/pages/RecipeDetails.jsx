import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=278a54a8a413448596733b9b91bb771b`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }

        const data = await response.json();
        setRecipe(data);

        // Check if recipe is saved
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const isRecipeSaved = savedRecipes.some(r => r.id === parseInt(id));
        setIsSaved(isRecipeSaved);
      } catch (err) {
        setError('Failed to load recipe details');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleSave = () => {
    if (!recipe) return;

    try {
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      
      if (isSaved) {
        // Remove recipe from saved recipes
        const filteredRecipes = savedRecipes.filter(r => r.id !== recipe.id);
        localStorage.setItem('savedRecipes', JSON.stringify(filteredRecipes));
      } else {
        // Add recipe to saved recipes
        const recipeToSave = {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings
        };
        savedRecipes.push(recipeToSave);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      }
      
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error saving recipe:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Recipe not found</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={toggleSave}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
            <p className="text-gray-600">
              Ready in {recipe.readyInMinutes} minutes • {recipe.servings} servings
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            {recipe.analyzedInstructions[0]?.steps ? (
              <ol className="space-y-4">
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-semibold mr-4">
                      {step.number}
                    </span>
                    <p className="text-gray-700 pt-1">{step.step}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            )}
          </div>

          {recipe.sourceName && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Recipe from: <a href={recipe.sourceUrl} className="text-orange-500 hover:text-orange-600" target="_blank" rel="noopener noreferrer">{recipe.sourceName}</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;