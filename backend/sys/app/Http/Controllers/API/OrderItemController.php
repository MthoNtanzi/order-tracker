<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderItemResource;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index($orderId)
    {
        $items = OrderItem::with('product')->where('order_id', $orderId)->get();
        return OrderItemResource::collection($items);
    }

    public function show($orderId, $productId)
    {
        $item = OrderItem::with('product')
            ->where('order_id', $orderId)
            ->where('pro_id', $productId)
            ->firstOrFail();

        return new OrderItemResource($item);
    }

    public function update(Request $request, $orderId, $productId)
    {
        $validated = $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric|min:0',
        ]);

        $item = OrderItem::where('order_id', $orderId)
            ->where('pro_id', $productId)
            ->firstOrFail();

        $item->update($validated);
        return new OrderItemResource($item);
    }
}