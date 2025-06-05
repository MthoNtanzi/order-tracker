<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->order_id,
            'customer_id' => $this->cus_id,
            'user_id' => $this->user_id,
            'time' => $this->order_time,
            'status' => $this->order_status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Relationships (when loaded)
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'user' => new UserResource($this->whenLoaded('user')),
            'items' => OrderItemResource::collection($this->whenLoaded('items')),
        ];
    }
}