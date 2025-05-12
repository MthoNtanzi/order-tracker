
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import OrderForm from '@/components/orders/OrderForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditOrderPage = () => {
  const { orderId } = useParams();
  const { orders, updateOrder } = useData();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === parseInt(orderId || '0'));

  const handleSubmit = (data) => {
    if (order) {
      updateOrder({
        ...order,
        ...data
      });
      navigate('/orders');
    }
  };

  if (!order) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Order not found</p>
        <button 
          onClick={() => navigate('/orders')}
          className="mt-4 text-brand-600 hover:text-brand-800"
        >
          Return to Orders
        </button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Order #{order.orderNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderForm 
          order={order}
          onSubmit={handleSubmit} 
          onCancel={() => navigate('/orders')} 
        />
      </CardContent>
    </Card>
  );
};

export default EditOrderPage;
