<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Faq;

class FaqController extends Controller
{
    public function index() {
        $faqs = Faq::orderBy('created_at','DESC')
        ->where('status',1)
        ->get();

        return response()->json([
            'status' => true,
            'data' => $faqs
        ]);
    } 

    public function faq($id) {
        $faq= Faq::find($id);

        if($faq == null) {
            return response()->json([
            'status' => false,
            'message' => 'Pertanyaan tidak ditemukan'
            ]);
        }

        return response()->json([   
            'status' => true,
            'data' => $faq
        ]);
    }
}
