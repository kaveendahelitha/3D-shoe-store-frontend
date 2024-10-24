import React, { useState, useEffect } from 'react';
import ApiService from '../../components/service/ApiService';

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ApiService.getOrderDetails();
        setOrders(data);
      } catch (error) {
        console.error("Error getting orders:", error.message);
      }
    };
    fetchOrders();
  }, []);

  // Function to handle deleting an order
  const handleDelete = async (orderId) => {
    try {
      alert("Are you want to delete this")
      await ApiService.deleteOrderItem(orderId);
      
      
      setOrders((prevOrders) => prevOrders.filter(order => order.orderId !== orderId));
      alert("Order delete succssfull!")
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  return (
    <div className="font-[sans-serif] overflow-x-auto mt-12">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">Product Name</th>
            <th className="p-4 text-left text-sm font-medium text-white">Product Price</th>
            <th className="p-4 text-left text-sm font-medium text-white">Status</th>
            <th className="p-4 text-left text-sm font-medium text-white">Size</th>

            <th className="p-4 text-left text-sm font-medium text-white">Amount</th>
            <th className="p-4 text-left text-sm font-medium text-white">Delete Order</th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {orders.map((order, index) => (
            <tr key={order.orderId} className={index % 2 === 0 ? 'even:bg-blue-50' : ''}>
              <td className="p-4 text-sm text-black">{order.product.productName}</td>
              <td className="p-4 text-sm text-black">{order.product.productPrice}</td>
              <td className="p-4 text-sm text-black">{order.orderStatus}</td>
              <td className="p-4 text-sm text-black">{order.orderSize}</td>
              <td className="p-4 text-sm text-black">{order.orderAmount}</td>
              <td className="p-4 text-sm text-black">
                <button
                  className={`px-4 py-2 text-sm rounded ${
                    order.orderStatus === 'Delivered' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-800 text-white'
                  }`}
                  onClick={() => handleDelete(order.orderId)}
                  disabled={order.orderStatus === 'Delivered'}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
