
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Order, Customer, useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Schema for order product items
const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().min(0.01),
  quantity: z.number().int().min(1)
});

const orderSchema = z.object({
  customerId: z.number({
    required_error: "Please select a customer",
  }),
  status: z.enum(['pending', 'processing', 'completed', 'cancelled'], {
    required_error: "Please select a status",
  }),
  orderDate: z.string().min(1, { message: "Order date is required" }),
});

type FormData = z.infer<typeof orderSchema>;

// Mock product data - in a real app this would come from the API
const AVAILABLE_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Smartphone', price: 800 },
  { id: 3, name: 'Headphones', price: 150 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Keyboard', price: 80 },
];

interface OrderFormProps {
  order?: Order;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onSubmit, onCancel }) => {
  const { customers } = useData();
  const [selectedProducts, setSelectedProducts] = useState<Array<typeof AVAILABLE_PRODUCTS[0] & { quantity: number }>>(
    order?.products || []
  );
  
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Convert order date to input format (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: order
      ? {
          customerId: order.customerId,
          status: order.status,
          orderDate: formatDateForInput(order.orderDate),
        }
      : {
          status: 'pending',
          orderDate: formatDateForInput(new Date().toISOString()),
        },
  });

  // Calculate total based on selected products
  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  // Handle adding a product to order
  const handleAddProduct = () => {
    if (selectedProduct !== null) {
      const productToAdd = AVAILABLE_PRODUCTS.find(p => p.id === selectedProduct);
      if (productToAdd) {
        // Check if product already exists in order
        const existingProductIndex = selectedProducts.findIndex(p => p.id === selectedProduct);
        
        if (existingProductIndex >= 0) {
          // Update quantity if product already in order
          const updatedProducts = [...selectedProducts];
          updatedProducts[existingProductIndex] = {
            ...updatedProducts[existingProductIndex],
            quantity: updatedProducts[existingProductIndex].quantity + quantity
          };
          setSelectedProducts(updatedProducts);
        } else {
          // Add new product to order
          setSelectedProducts([
            ...selectedProducts,
            { ...productToAdd, quantity }
          ]);
        }
        
        // Reset selection
        setSelectedProduct(null);
        setQuantity(1);
      }
    }
  };

  // Handle removing a product from order
  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleFormSubmit = (data: FormData) => {
    // If no products selected, don't submit
    if (selectedProducts.length === 0) {
      alert("Please add at least one product to the order");
      return;
    }

    // Combine form data with products
    const formattedData = {
      ...data,
      products: selectedProducts,
      totalAmount: calculateTotal()
    };
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="customerId">Customer</Label>
          <Select
            onValueChange={(value) => setValue('customerId', parseInt(value))}
            defaultValue={order?.customerId?.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id.toString()}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.customerId && <p className="text-sm text-red-500">{errors.customerId.message}</p>}
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) => setValue('status', value as 'pending' | 'processing' | 'completed' | 'cancelled')}
            defaultValue={order?.status || 'pending'}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
        </div>

        <div>
          <Label htmlFor="orderDate">Order Date</Label>
          <Input
            id="orderDate"
            type="date"
            {...register('orderDate')}
            defaultValue={order?.orderDate ? formatDateForInput(order.orderDate) : formatDateForInput(new Date().toISOString())}
          />
          {errors.orderDate && <p className="text-sm text-red-500">{errors.orderDate.message}</p>}
        </div>
      </div>

      {/* Products section */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Products</h3>
        
        {/* Add product form */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex-1 min-w-[200px]">
            <Select onValueChange={(value) => setSelectedProduct(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_PRODUCTS.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} - ${product.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-24">
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              placeholder="Qty"
            />
          </div>
          
          <Button type="button" onClick={handleAddProduct} disabled={selectedProduct === null}>
            Add
          </Button>
        </div>
        
        {/* Selected products table */}
        {selectedProducts.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2 text-right">Subtotal</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2 text-right">${product.price}</td>
                    <td className="px-4 py-2 text-right">{product.quantity}</td>
                    <td className="px-4 py-2 text-right">${(product.price * product.quantity).toFixed(2)}</td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-4 py-2" colSpan={3}>Total</td>
                  <td className="px-4 py-2 text-right">${calculateTotal().toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 rounded border">
            <p className="text-gray-500">No products added yet</p>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {order ? 'Update Order' : 'Create Order'}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
