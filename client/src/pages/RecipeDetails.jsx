import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import SearchBar from "./SearchBar"; // Import the SearchBar

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleSave = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    if (isSaved) {
      const filtered = savedRecipes.filter((r) => r.id !== recipe.id);
      localStorage.setItem("savedRecipes", JSON.stringify(filtered));
    } else {
      savedRecipes.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    }
    setIsSaved(!isSaved);
  };

  // Handle search query and navigate to search results
  const handleSearch = (query) => {
    navigate(`/search?query=${query}`);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!recipe) return <div className="text-center">Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar Added Here */}
      <SearchBar onSearch={handleSearch} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
            <button
              onClick={toggleSave}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isSaved ? (
                <HeartIconSolid className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-500" />
              )}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside space-y-1">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <div
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              className="prose max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
