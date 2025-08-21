<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use Illuminate\Http\Request;

class MitraController extends Controller
{
    public function latestMitras(Request $request) {
        $mitras = Mitra::orderBy('created_at','DESC')
        ->where('status',1)
        ->limit($request->limit)
        ->get();

        return response()->json([
            'status' => true,
            'data' => $mitras
        ]);
    }

    public function index() {
        $mitras = Mitra::orderBy('created_at','DESC')
        ->where('status',1)
        ->get();

        return response()->json([
            'status' => true,
            'data' => $mitras
        ]);
    }

    public function mitra($id) {
        $mitra = Mitra::find($id);
        if($mitra == null) {
            return response()->json([
                'status' => false,
                'message' => "Mitra tidak ditemukan"
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $mitra
        ]);
    }

    public function count() {
        $count = Mitra::count();
            
        return response()->json([
            'status' => true,
            'total' => $count
        ]);
    }
}
