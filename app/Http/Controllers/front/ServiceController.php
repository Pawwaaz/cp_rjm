<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    //return all active service
    public function index() {
        $services = Service::where('status',1)->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }
    //return latest active service
    public function latestServices(Request $request) {
        $services = Service::where('status',1)
        ->take($request->get('limit'))
        ->orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }
    //return a singe detail service
    public function service($id) {
        $service = Service::find($id);
        if($service == null) {
            return response()->json([
                'status' => false,
                'message' => "Layanan tidak ditemukan"
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }
}
