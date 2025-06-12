import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatCards = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Fetch customers
    fetch("http://127.0.0.1:8000/api/customers")
      .then(res => res.json())
      .then(data => {
        const customerList = Array.isArray(data) ? data : data.data;
        setCustomers(customerList || []);
      })
      .catch(err => console.error("Failed to fetch customers:", err));

    // Fetch orders
    fetch("http://127.0.0.1:8000/api/orders")
      .then(res => res.json())
      .then(data => {
        const orderList = Array.isArray(data) ? data : data.data;
        setOrders(orderList || []);
        filterRecentOrders(orderList);
      })
      .catch(err => console.error("Failed to fetch orders:", err));
  }, []);

  const filterRecentOrders = (orderList) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recent = orderList.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate >= sevenDaysAgo;
    });

    setRecentOrders(recent);

    const recentOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return orderDate >= sevenDaysAgo;
    });
    
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customers.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{orders.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Orders (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentOrders.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Avg. Order Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R{avgOrderValue.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;


