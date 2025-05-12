
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import OrderForm from '@/components/orders/OrderForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NewOrderPage = () => {
  const { addOrder } = useData();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    addOrder(data);
    navigate('/orders');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Order</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderForm 
          onSubmit={handleSubmit} 
          onCancel={() => navigate('/orders')} 
        />
      </CardContent>
    </Card>
  );
};

export default NewOrderPage;
