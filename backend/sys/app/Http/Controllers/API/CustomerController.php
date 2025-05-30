<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return CustomerResource::collection($customers);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cus_name' => 'required|string|max:50',
            'cus_email' => 'required|string|email|max:255|unique:customers',
            'cus_password' => 'required|string|min:8',
            'cus_number' => 'required|string|max:255',
        ]);

        $validated['cus_password'] = Hash::make($validated['cus_password']);
        $customer = Customer::create($validated);

        return new CustomerResource($customer);
    }

    public function show(Customer $customer)
    {
        return new CustomerResource($customer);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'cus_name' => 'sometimes|string|max:50',
            'cus_email' => 'sometimes|string|email|max:255|unique:customers,cus_email,'.$customer->cus_id.',cus_id',
            'cus_password' => 'sometimes|string|min:8',
            'cus_number' => 'sometimes|string|max:255',
        ]);

        if (isset($validated['cus_password'])) {
            $validated['cus_password'] = Hash::make($validated['cus_password']);
        }

        $customer->update($validated);
        return new CustomerResource($customer);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(null, 204);
    }
}