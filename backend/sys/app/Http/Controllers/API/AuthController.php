<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return response()->json(['message' => 'Registration disabled in simple mode'], 403);
    }

    public function login(Request $request)
    {
        return response()->json(['message' => 'Login disabled in simple mode'], 403);
    }

    public function logout(Request $request)
    {
        return response()->json(['message' => 'Logout disabled in simple mode'], 403);
    }
}