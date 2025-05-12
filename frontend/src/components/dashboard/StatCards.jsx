
import React from 'react';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatCards = () => {
  const { orders, customers, getRecentOrders } = useData();
  
  // Get total orders in the last 7 days
  const recentOrders = getRecentOrders(7);
  
  // Calculate total revenue from all orders
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Calculate average order value
  const avgOrderValue = orders.length > 0 
    ? totalRevenue / orders.length 
    : 0;
  
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
          <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
