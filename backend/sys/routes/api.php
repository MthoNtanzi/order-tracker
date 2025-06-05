<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderItemController;

// Public data routes - ALL routes now
Route::apiResource('users', UserController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('customers', CustomerController::class);
Route::apiResource('orders', OrderController::class);

// Order items routes
Route::post('orders/{order}/items', [OrderController::class, 'addItem']);
Route::delete('orders/{order}/items/{itemId}', [OrderController::class, 'removeItem']);
Route::get('orders/{order}/items', [OrderItemController::class, 'index']);
Route::get('orders/{order}/items/{product}', [OrderItemController::class, 'show']);
Route::put('orders/{order}/items/{product}', [OrderItemController::class, 'update']);