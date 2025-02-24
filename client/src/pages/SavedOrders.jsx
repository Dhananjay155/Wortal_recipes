import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SavedOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="pt-20 container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
        <Link to="/menu" className="btn inline-block mt-4">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {order.menuItem.name}
                  </h2>
                  <p className="text-gray-600">
                    Quantity: {order.quantity}
                  </p>
                  <p className="text-gray-600">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                  {order.specialInstructions && (
                    <p className="text-gray-600 mt-2">
                      Special Instructions: {order.specialInstructions}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-orange-500">
                    ${order.total.toFixed(2)}
                  </span>
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <Link
                  to={`/order/${order.menuItemId}`}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Order Again
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedOrders;