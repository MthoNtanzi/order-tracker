
import React from 'react';
import StatCards from '@/components/dashboard/StatCards';
import OrdersChart from '@/components/dashboard/OrdersChart';
import StatusChart from '@/components/dashboard/StatusChart';
import RecentOrdersList from '@/components/dashboard/RecentOrdersList';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <StatCards />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OrdersChart />
        <StatusChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentOrdersList />
      </div>
    </div>
  );
};

export default Dashboard;
