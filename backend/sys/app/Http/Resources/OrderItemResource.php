<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'product_id' => $this->pro_id,
            'quantity' => (int)$this->quantity,
            'price' => (float)$this->price,
            'subtotal' => (float)($this->quantity * $this->price),
            // Relationships (when loaded)
            'product' => new ProductResource($this->whenLoaded('product')),
        ];
    }
}