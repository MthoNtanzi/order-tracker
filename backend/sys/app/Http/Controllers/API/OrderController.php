<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['customer', 'user', 'items.product'])->get();
        return OrderResource::collection($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cus_id' => 'required|exists:customers,cus_id',
            'user_id' => 'required|exists:users,user_id',
            'order_status' => 'required|string|max:255',
        ]);

        $validated['order_time'] = now();
        $order = Order::create($validated);

        return new OrderResource($order);
    }

    public function show(Order $order)
    {
        $order->load(['customer', 'user', 'items.product']);
        return new OrderResource($order);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'order_status' => 'sometimes|string|max:255',
        ]);

        $order->update($validated);
        return new OrderResource($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, 204);
    }

    public function addItem(Request $request, Order $order)
    {
        $validated = $request->validate([
            'pro_id' => 'required|exists:products,pro_id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $item = $order->items()->create($validated);
        return response()->json($item, 201);
    }

    public function removeItem(Order $order, $itemId)
    {
        $order->items()->where('pro_id', $itemId)->delete();
        return response()->json(null, 204);
    }
}