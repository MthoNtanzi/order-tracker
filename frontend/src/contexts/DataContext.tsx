
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { useAuth } from './AuthContext';

// Define types
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  products: { id: number; name: string; price: number; quantity: number }[];
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
}

interface DataContextType {
  customers: Customer[];
  orders: Order[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber'>) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (id: number) => void;
  getCustomerById: (id: number) => Customer | undefined;
  getOrdersByCustomerId: (customerId: number) => Order[];
  getRecentOrders: (days: number) => Order[];
  getOrdersPerCustomer: (days: number) => { customerId: number; customerName: string; orderCount: number }[];
}

// Mock data
const MOCK_CUSTOMERS: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '555-3456' },
];

// Generate random dates within the last 10 days
const getRandomRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 10));
  return date.toISOString();
};

const generateOrderNumber = () => {
  return `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
};

// Products
const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Smartphone', price: 800 },
  { id: 3, name: 'Headphones', price: 150 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Keyboard', price: 80 },
];

const generateRandomOrder = (id: number, customerId: number): Order => {
  // Select 1 to 3 products
  const numProducts = Math.floor(Math.random() * 3) + 1;
  const selectedProducts = [];
  
  for (let i = 0; i < numProducts; i++) {
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    
    selectedProducts.push({
      ...product,
      quantity
    });
  }
  
  const totalAmount = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  
  return {
    id,
    orderNumber: generateOrderNumber(),
    customerId,
    products: selectedProducts,
    orderDate: getRandomRecentDate(),
    status: ['pending', 'processing', 'completed', 'cancelled'][Math.floor(Math.random() * 4)] as any,
    totalAmount
  };
};

// Generate mock orders
const MOCK_ORDERS: Order[] = [
  // Customer 1 orders
  generateRandomOrder(1, 1),
  generateRandomOrder(2, 1),
  generateRandomOrder(3, 1),
  
  // Customer 2 orders
  generateRandomOrder(4, 2),
  generateRandomOrder(5, 2),
  
  // Customer 3 orders
  generateRandomOrder(6, 3),
  generateRandomOrder(7, 3),
  generateRandomOrder(8, 3),
  generateRandomOrder(9, 3),
  
  // Customer 4 orders
  generateRandomOrder(10, 4)
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Simulate data loading from API
      setTimeout(() => {
        setCustomers(MOCK_CUSTOMERS);
        setOrders(MOCK_ORDERS);
      }, 500);
    } else {
      // Clear data when logged out
      setCustomers([]);
      setOrders([]);
    }
  }, [isAuthenticated]);

  // Customer CRUD operations
  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = {
      id: customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1,
      ...customer
    };
    setCustomers([...customers, newCustomer]);
    toast.success(`Added customer: ${newCustomer.name}`);
  };

  const updateCustomer = (customer: Customer) => {
    setCustomers(customers.map(c => c.id === customer.id ? customer : c));
    toast.success(`Updated customer: ${customer.name}`);
  };

  const deleteCustomer = (id: number) => {
    // Check if customer has orders
    const hasOrders = orders.some(order => order.customerId === id);
    if (hasOrders) {
      toast.error("Cannot delete customer with existing orders");
      return;
    }
    
    const customer = customers.find(c => c.id === id);
    setCustomers(customers.filter(c => c.id !== id));
    if (customer) {
      toast.success(`Deleted customer: ${customer.name}`);
    }
  };

  // Order CRUD operations
  const addOrder = (order: Omit<Order, 'id' | 'orderNumber'>) => {
    const newOrder = {
      id: orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      orderNumber: generateOrderNumber(),
      ...order
    };
    setOrders([...orders, newOrder]);
    toast.success(`Added order: ${newOrder.orderNumber}`);
  };

  const updateOrder = (order: Order) => {
    setOrders(orders.map(o => o.id === order.id ? order : o));
    toast.success(`Updated order: ${order.orderNumber}`);
  };

  const deleteOrder = (id: number) => {
    const order = orders.find(o => o.id === id);
    setOrders(orders.filter(o => o.id !== id));
    if (order) {
      toast.success(`Deleted order: ${order.orderNumber}`);
    }
  };

  // Helper functions
  const getCustomerById = (id: number): Customer | undefined => {
    return customers.find(c => c.id === id);
  };

  const getOrdersByCustomerId = (customerId: number): Order[] => {
    return orders.filter(o => o.customerId === customerId);
  };

  // Get orders from the last X days
  const getRecentOrders = (days: number): Order[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= cutoffDate;
    });
  };

  // Get order count per customer in the last X days
  const getOrdersPerCustomer = (days: number): { customerId: number; customerName: string; orderCount: number }[] => {
    const recentOrders = getRecentOrders(days);
    const orderCountMap = new Map<number, number>();
    
    // Count orders per customer
    recentOrders.forEach(order => {
      const currentCount = orderCountMap.get(order.customerId) || 0;
      orderCountMap.set(order.customerId, currentCount + 1);
    });
    
    // Convert to array format
    return Array.from(orderCountMap.entries()).map(([customerId, orderCount]) => {
      const customer = getCustomerById(customerId);
      return {
        customerId,
        customerName: customer?.name || 'Unknown Customer',
        orderCount
      };
    }).sort((a, b) => b.orderCount - a.orderCount); // Sort by count descending
  };

  return (
    <DataContext.Provider
      value={{
        customers,
        orders,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addOrder,
        updateOrder,
        deleteOrder,
        getCustomerById,
        getOrdersByCustomerId,
        getRecentOrders,
        getOrdersPerCustomer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
