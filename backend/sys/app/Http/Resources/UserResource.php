<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->user_id,
            'name' => $this->user_name,
            'email' => $this->user_email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Relationships (when loaded)
            'orders' => OrderResource::collection($this->whenLoaded('orders')),
        ];
    }
}