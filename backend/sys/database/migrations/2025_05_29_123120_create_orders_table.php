<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->foreignId('cus_id')->constrained('customer', 'cus_id');
            $table->foreignId('user_id')->constrained('users', 'user_id');
            $table->dateTime('order_time');
            $table->string('order_status', 255);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};