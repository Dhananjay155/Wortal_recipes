import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 mb-6">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for dishes..."
          className="w-full px-4 py-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 focus:outline-none"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;