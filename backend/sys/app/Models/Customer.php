<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Customer extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'cus_id';
    protected $fillable = [
        'cus_name',
        'cus_email',
        'cus_password',
        'cus_number',
    ];
    protected $hidden = [
        'cus_password',
        'remember_token',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'cus_id');
    }
}