<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->foreignId('order_id')->constrained('orders', 'order_id');
            $table->foreignId('pro_id')->constrained('products', 'pro_id');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            
            $table->primary(['order_id', 'pro_id']); // Composite primary key
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};