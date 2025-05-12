
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

const OrderList: React.FC = () => {
  const { orders, customers, deleteOrder, getCustomerById } = useData();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [orderToDelete, setOrderToDelete] = React.useState<Order | null>(null);
  const navigate = useNavigate();

  const handleDeleteClick = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (orderToDelete) {
      deleteOrder(orderToDelete.id);
    }
    setIsDeleteDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
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
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
        <Button onClick={() => navigate('/orders/new')}>Create Order</Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No orders found. Create your first order to get started.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const customer = getCustomerById(order.customerId);
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>{customer?.name || 'Unknown'}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteClick(order)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete order {orderToDelete?.orderNumber}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderList;
