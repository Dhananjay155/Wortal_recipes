import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const menuItem = MENU_ITEMS.find(item => item.id === parseInt(id));

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    const newOrder = {
      id: Date.now(),
      menuItemId: parseInt(id),
      menuItem,
      quantity,
      specialInstructions,
      status: 'pending',
      date: new Date().toISOString(),
      total: menuItem.price * quantity
    };
    
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    
    navigate('/orders');
  };

  if (!menuItem) {
    return (
      <div className="pt-20 text-center">
        <p className="text-gray-600">Item not found</p>
      </div>
    );
  }

  return (
    <div className="pt-20 container mx-auto px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={menuItem.image}
          alt={menuItem.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{menuItem.name}</h1>
            <span className="text-xl text-orange-500 font-bold">
              ${menuItem.price}
            </span>
          </div>
          <p className="text-gray-600 mb-6">{menuItem.description}</p>
          
          <form onSubmit={handleSubmitOrder}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="input"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="instructions">
                Special Instructions
              </label>
              <textarea
                id="instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="input min-h-[100px]"
                placeholder="Any special requests?"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">
                Total: ${(menuItem.price * quantity).toFixed(2)}
              </span>
              <button type="submit" className="btn">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

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
  }
];

export default OrderDetails;
