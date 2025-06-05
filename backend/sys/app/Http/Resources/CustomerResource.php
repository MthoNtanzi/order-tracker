<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->cus_id,
            'name' => $this->cus_name,
            'email' => $this->cus_email,
            'phone_number' => $this->cus_number,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Relationships (when loaded)
            'orders' => OrderResource::collection($this->whenLoaded('orders')),
        ];
    }
}