<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('customer', function (Blueprint $table) {
            $table->id('cus_id');
            $table->string('cus_name', 50);
            $table->string('cus_email', 255);
            $table->string('cus_password', 255);
            $table->string('cus_number', 255);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customer');
    }
};