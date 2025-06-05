<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where we register API routes for our application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Happy building Team!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Customer registration (if needed)
Route::post('/customers/register', [CustomerController::class, 'register']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Users
    Route::apiResource('users', UserController::class);
    
    // Products
    Route::apiResource('products', ProductController::class);
    
    // Customers
    Route::apiResource('customers', CustomerController::class)->except(['store']);
    
    // Orders
    Route::apiResource('orders', OrderController::class);
    Route::post('orders/{order}/items', [OrderController::class, 'addItem']);
    Route::delete('orders/{order}/items/{item}', [OrderController::class, 'removeItem']);
    
    // Order Items
    Route::get('orders/{order}/items', [OrderItemController::class, 'index']);
    Route::get('orders/{order}/items/{product}', [OrderItemController::class, 'show']);
    Route::put('orders/{order}/items/{product}', [OrderItemController::class, 'update']);
});