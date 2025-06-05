<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->pro_id,
            'name' => $this->pro_name,
            'price' => (float)$this->pro_price,
            'sku' => $this->pro_sku,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Relationships (when loaded)
            'order_items' => OrderItemResource::collection($this->whenLoaded('orderItems')),
        ];
    }
}