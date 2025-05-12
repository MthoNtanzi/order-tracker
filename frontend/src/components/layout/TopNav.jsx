
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NavLink, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const TopNav = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Generate page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    return path.charAt(1).toUpperCase() + path.slice(2);
  };

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <div className="md:hidden">
              {/* Mobile navigation */}
              <div className="flex flex-col space-y-3 py-2">
                <NavLink 
                  to="/"
                  className={({ isActive }) => 
                    `px-2 py-1 text-sm font-medium rounded ${
                      isActive ? 'bg-brand-700 text-white' : 'text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/orders"
                  className={({ isActive }) => 
                    `px-2 py-1 text-sm font-medium rounded ${
                      isActive ? 'bg-brand-700 text-white' : 'text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  Orders
                </NavLink>
                <NavLink 
                  to="/customers" 
                  className={({ isActive }) => 
                    `px-2 py-1 text-sm font-medium rounded ${
                      isActive ? 'bg-brand-700 text-white' : 'text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  Customers
                </NavLink>
              </div>
            </div>
          )}
          <h1 className="text-xl font-bold md:text-2xl">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-sm text-gray-600">
            <span className="mr-1">Logged in as:</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
