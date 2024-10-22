// src/components/OrderPlaceAdmin.js
import React, { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";

export default function OrderPlaceAdmin() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch orders based on current status
  const fetchOrders = async (currentStatus) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.getAllOrderDetails(currentStatus);
      setOrders(data);
      toast.success("Orders fetched successfully!");
    } catch (err) {
      setError("Failed to fetch orders.");
      alert("Error fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when the component mounts or when the status changes
  useEffect(() => {
    fetchOrders(status);
  }, [status]);

  // Handler for status button clicks
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  // Handler for marking an order as delivered
  const handleMarkAsDelivered = async (orderId) => {
    const confirmAction = window.confirm(
      "Are you sure you want to mark this order as delivered?"
    );
    if (!confirmAction) return;

    try {
      await ApiService.markOrderAsDelivered(orderId);
      alert("Order marked as delivered!");
      // Refresh the orders list after marking as delivered
      fetchOrders(status);
    } catch (err) {
      alert("Failed to mark order as delivered.");
    }
  };

  return (
    <div className="font-sans overflow-x-auto mt-12">
      {/* Status Buttons */}
      <div className="w-max mx-auto bg-gray-200 border divide-x divide-white flex rounded overflow-hidden">
        {["All", "Placed", "Delivered"].map((stat) => (
          <button
            key={stat}
            type="button"
            onClick={() => handleStatusChange(stat)}
            className={`px-5 py-2.5 flex items-center text-sm outline-none hover:bg-gray-300 transition-all ${
              status === stat ? "bg-gray-300" : ""
            }`}
          >
            {stat === "All" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
            {stat === "Placed" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17px"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 24 24"
              >
                <path
                  d="m20 8.6-8.38 8.38c-.29.29-.67.47-1.08.51l-2.93.27H7.5c-.33 0-.65-.13-.88-.37-.26-.26-.39-.63-.36-1l.27-2.93c.04-.41.22-.79.51-1.08L15.4 4zm1.94-5.83-.71-.71a2.758 2.758 0 0 0-3.89 0l-.88.88 4.6 4.6.88-.88a2.732 2.732 0 0 0 0-3.88zm-1.19 16.24V13.2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v5.81c0 1.24-1.01 2.25-2.25 2.25H5c-1.24 0-2.25-1.01-2.25-2.25V7c0-1.24 1.01-2.25 2.25-2.25h5.81c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H5C2.93 3.25 1.25 4.93 1.25 7v12c0 2.07 1.68 3.75 3.75 3.75h12c2.07 0 3.75-1.68 3.75-3.75z"
                  data-original="#000000"
                />
              </svg>
            )}
            {stat === "Delivered" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
            {stat}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="min-w-full bg-white mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Product Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Order Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Contact No
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="even:bg-blue-50 hover:bg-gray-100"
                >
                  <td className="p-4 text-sm text-black">
                    {order.product.productName}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {order.orderFullName}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {order.orderContactNumber}
                  </td>
                  <td
                    className={`p-4 text-sm ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600 font-semibold"
                        : "text-black"
                    }`}
                  >
                    {order.orderStatus}
                  </td>
                  <td className="p-4">
                    {order.orderStatus !== "Delivered" && (
                      <button
                        className="mr-4"
                        title="Mark as Delivered"
                        onClick={() => handleMarkAsDelivered(order.orderId)}
                      >
                       
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5  w-5 fill-blue-500 hover:fill-neutral-900"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
