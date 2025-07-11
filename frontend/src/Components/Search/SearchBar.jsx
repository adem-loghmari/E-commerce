import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Debounce and fetch suggestions
  const fetchSuggestions = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/search/suggestions?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.success) {
        setSearchResults(data.suggestions);
        setIsSearchOpen(true);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search fetch error:", err);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search submitted:", searchQuery);
      // Optionally redirect to search results page here
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceTimeout.current);
    };
  }, []);
  return (
    <div className="relative flex-1 max-w-xl mx-4" ref={searchRef}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setIsSearchOpen(true)}
          placeholder="Search products..."
          className="w-full py-2 pl-5 pr-12 rounded-full border border-gray-300 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-pink-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {/* Search Results Dropdown */}
      {isSearchOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={product.image || `${product.name}`}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">${product.new_price}</p>
                  <p className="text-sm text-black">{product.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {searchQuery.length > 0
                ? "No products found"
                : "Type to search products"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
