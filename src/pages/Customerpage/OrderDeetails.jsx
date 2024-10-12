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

  return (
    <div className="font-[sans-serif] overflow-x-auto mt-12">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">Full Name</th>
            <th className="p-4 text-left text-sm font-medium text-white">Address</th>
            <th className="p-4 text-left text-sm font-medium text-white">Contact Number</th>
            <th className="p-4 text-left text-sm font-medium text-white">Alternate Contact</th>
            <th className="p-4 text-left text-sm font-medium text-white">Status</th>
            <th className="p-4 text-left text-sm font-medium text-white">Amount</th>
            <th className="p-4 text-left text-sm font-medium text-white">Product Name</th>
            <th className="p-4 text-left text-sm font-medium text-white">Product Price</th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {orders.map((order, index) => (
            <tr key={order.orderId} className={index % 2 === 0 ? 'even:bg-blue-50' : ''}>
              <td className="p-4 text-sm text-black">{order.orderFullName}</td>
              <td className="p-4 text-sm text-black">{order.orderFullOrder}</td>
              <td className="p-4 text-sm text-black">{order.orderContactNumber}</td>
              <td className="p-4 text-sm text-black">{order.orderAlternateContactNumber}</td>
              <td className="p-4 text-sm text-black">{order.orderStatus}</td>
              <td className="p-4 text-sm text-black">{order.orderAmount}</td>
              <td className="p-4 text-sm text-black">{order.product.productName}</td>
              <td className="p-4 text-sm text-black">{order.product.productPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
