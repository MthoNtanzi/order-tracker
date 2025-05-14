
import React from 'react';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OrdersChart = () => {
  const { getOrdersPerCustomer } = useData();
  
  // Get orders for the last 7 days
  const orderData = getOrdersPerCustomer(7);
  
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Orders per Customer (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {orderData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No order data available for the last 7 days</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={orderData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="customerName" 
                angle={-45} 
                textAnchor="end" 
                height={60} 
                tick={{ fontSize: 12 }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip 
                formatter={(value) => [`${value} orders`, 'Count']}
                labelFormatter={(value) => `Customer: ${value}`}
              />
              <Bar 
                dataKey="orderCount" 
                name="Orders" 
                fill="#0ea5e9" 
                barSize={40} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersChart;
