import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchRecipes, getRandomRecipes } from '../services/recipeService';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadFeaturedRecipes();
  }, []);

  const loadFeaturedRecipes = async () => {
    const recipes = await getRandomRecipes();
    setFeaturedRecipes(recipes);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    const results = await searchRecipes(searchQuery);
    setSearchResults(results);
    setLoading(false);
  };

  const handleViewRecipe = (recipeId) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/recipe/${recipeId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-xl overflow-hidden my-8">
        <img
          src="https://cdn.pixabay.com/photo/2023/06/20/17/30/youtube-banner-8077450_1280.jpg"
          alt="Delicious Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to our</h1>
          <h2 className="text-6xl font-bold mb-8">Recipe Collection</h2>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-[500px] px-6 py-3 rounded-full text-gray-800 bg-amber-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="my-16">
          <h3 className="text-3xl font-bold mb-8">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{recipe.title}</h4>
                  <p className="text-gray-600 mb-4">
                    Ready in {recipe.readyInMinutes} minutes • {recipe.servings} servings
                  </p>
                  <button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Section */}
      <div className="my-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="Featured Dish"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pl-8">
            <h3 className="text-4xl font-bold mb-6">Discover Amazing Recipes</h3>
            <p className="text-gray-600 mb-8">
              Explore our collection of delicious recipes from around the world. From quick and easy meals to gourmet dishes, find the perfect recipe for any occasion.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors">
              Browse All Recipes
            </button>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="my-16">
        <h3 className="text-3xl font-bold mb-8">Featured Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{recipe.title}</h4>
                <p className="text-gray-600 mb-4">
                  Ready in {recipe.readyInMinutes} minutes • {recipe.servings} servings
                </p>
                <button 
                  onClick={() => handleViewRecipe(recipe.id)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
