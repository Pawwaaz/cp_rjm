<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function updateProfileAdmin(Request $request){
        $admin = $request->user();

        $validator = Validator::make($request->all(),[
            'email' => 'required|email|unique:users,email,' . $admin->id,
            'current_password' => 'required',
            'password' => 'nullable|min:6|confirmed',
        ]);

        if ($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Hash::check($request->current_password, $admin->password)) {
            return response()->json([
                'errors' => ['current_password' => ['Password salah']],
            ], 422);
        }

        $admin->email = $request->email;

        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }

        $admin->save();

        return response()->json(['message' => 'Profil berhasil diperbarui']);

    }
}
