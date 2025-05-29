<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return ProductResource::collection($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pro_name' => 'required|string|max:255',
            'pro_price' => 'required|numeric',
            'pro_sku' => 'required|string|max:255|unique:products',
        ]);

        $product = Product::create($validated);
        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'pro_name' => 'sometimes|string|max:255',
            'pro_price' => 'sometimes|numeric',
            'pro_sku' => 'sometimes|string|max:255|unique:products,pro_sku,'.$product->pro_id.',pro_id',
        ]);

        $product->update($validated);
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}