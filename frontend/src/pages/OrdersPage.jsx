import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const orders = Array.isArray(data) ? data : data.data;
        setOrders(orders || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        // Optional: set an error state here
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Orders List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Order #{order.id} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
