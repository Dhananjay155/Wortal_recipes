import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Search Results for "{query}"
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.length > 0 ? (
          results.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="block">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{recipe.title}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
