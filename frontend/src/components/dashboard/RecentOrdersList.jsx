
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const RecentOrdersList = () => {
  const { getRecentOrders, getCustomerById } = useData();
  const navigate = useNavigate();
  
  // Get orders for the last 7 days
  const recentOrders = getRecentOrders(7).sort((a, b) => {
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
  }).slice(0, 5); // Get only the 5 most recent orders
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Processing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button size="sm" onClick={() => navigate('/orders')}>View All</Button>
      </CardHeader>
      <CardContent>
        {recentOrders.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No recent orders in the last 7 days</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => {
                const customer = getCustomerById(order.customerId);
                return (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/orders/${order.id}`)}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>{customer?.name || 'Unknown'}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrdersList;
