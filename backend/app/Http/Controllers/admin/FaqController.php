<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Faq;
use Illuminate\Support\Facades\Validator;


class FaqController extends Controller
{
    public function index() {
        // return Faq::all();
        $faq = Faq::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $faq
        ]);
    }

    public function show($id) {
        $faq =  Faq::findOrFail($id);

        if($faq == null) {
            return response()->json([
                'status' => false,
                'message' => 'Pertanyaan tidak ditemukan'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $faq,
        ]);
    }

    public function store(Request $request) {


        $validator = Validator::make($request->all(),[
            'question' => 'required',
            'answer' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ]);
        }

        $faq = new Faq();
        $faq->question = $request->question;
        $faq->answer = $request->answer;
        $faq->save();

        

        return response()->json([
            'status' => true,
            'message' => 'Pertanyaan dan Jawaban berhasil ditambahkan',
        ]);
    }

    public function update(Request $request, $id)
    {
        $faq =  Faq::findOrFail($id); 
            
        if($faq == null) {
            return response()->json([
                'status' => false,
                'message' => 'Pertanyaan tidak ditemukan'
            ]);
        }


        $validator = Validator::make($request->all(),[
           'question' => 'required',
            'answer' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $faq->question = $request->question;
        $faq->answer = $request->answer;
        $faq->status = $request->status;
        $faq->save();

        

        return response()->json([
            'status' => true,
            'message' => 'Pertanyaan berhasil diubah'
        ]);
    }

    public function destroy($id) {
        $faq =  Faq::findOrFail($id); 

        if($faq == null) {
            return response()->json([
                'status' => false,
                'message' => 'Pertanyaan tidak ditemukan'
            ]);
        }

        $faq->delete();

        return response()->json([
            'status' => true,
            'message' => 'Pertanyaan berhasil dihapus',
        ]);
    }
}
