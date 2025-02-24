import { useState } from 'react';
import { Link } from 'react-router-dom';

const MENU_ITEMS = [
  {
    id: 1,
    name: "Grilled Salmon",
    price: 24.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
    description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables"
  },
  {
    id: 2,
    name: "Beef Steak",
    price: 29.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef",
    description: "Premium cut beef steak cooked to your preference"
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 14.99,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    description: "Classic caesar salad with crispy bacon and parmesan"
  },
  // Add more menu items as needed
];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Starters", "Main Course", "Desserts"];

  const filteredItems = selectedCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
        
        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-orange-500 font-bold">${item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link
                  to={`/order/${item.id}`}
                  className="block text-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
                >
                  Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;