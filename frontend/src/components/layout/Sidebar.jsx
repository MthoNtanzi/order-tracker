
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-brand-700 text-white'
            : 'text-gray-300 hover:bg-brand-800 hover:text-white'
        }`
      }
    >
      <span className="mr-3 text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-brand-800 border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 bg-brand-900">
          <h2 className="text-xl font-bold text-white">Order Tracker</h2>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <NavItem to="/" icon="📊" label="Dashboard" />
            <NavItem to="/orders" icon="📦" label="Orders" />
            <NavItem to="/customers" icon="👥" label="Customers" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
