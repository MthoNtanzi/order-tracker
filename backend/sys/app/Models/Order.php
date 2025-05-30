<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_id';
    protected $fillable = [
        'cus_id',
        'user_id',
        'order_time',
        'order_status',
    ];

    // Cast order_time to datetime
    protected $casts = [
        'order_time' => 'datetime',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cus_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}