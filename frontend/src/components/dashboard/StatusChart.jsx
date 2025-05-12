
import React from 'react';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0ea5e9', '#fbbf24', '#22c55e', '#ef4444'];

const StatusChart = () => {
  const { orders } = useData();
  
  // Calculate status distribution
  const calculateStatusData = () => {
    const statusCount = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    
    return [
      { name: 'Processing', value: statusCount['processing'] || 0 },
      { name: 'Pending', value: statusCount['pending'] || 0 },
      { name: 'Completed', value: statusCount['completed'] || 0 },
      { name: 'Cancelled', value: statusCount['cancelled'] || 0 }
    ];
  };
  
  const statusData = calculateStatusData();
  const totalOrders = orders.length;
  
  // Custom tooltip formatter
  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalOrders) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{`${data.name}: ${data.value} orders`}</p>
          <p className="text-gray-600">{`${percentage}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        {totalOrders === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No order data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusChart;
