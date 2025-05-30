<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'pro_id';
    protected $fillable = [
        'pro_name',
        'pro_price',
        'pro_sku',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'pro_id');
    }

    // Cast price to float for proper handling
    protected $casts = [
        'pro_price' => 'float',
    ];
}