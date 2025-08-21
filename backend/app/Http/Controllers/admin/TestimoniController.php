<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class TestimoniController extends Controller
{  
    public function index()
    {
        $testimoni = Testimoni::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimoni,
        ]);
        
    }

    
    //Store a newly created resource in storage.
    
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'testimoni' => 'required',
            'citation' => 'required|unique:testimoni_tables,citation'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        try {
            $testimoni = new Testimoni();
            $testimoni->testimoni = $request->testimoni;
            $testimoni->citation = $request->citation;
            $testimoni->company = $request->company;
            $testimoni->status = $request->status;
            $testimoni->save();
    
            return response()->json([
                'status' => true,
                'message' => 'Testimoni berhasil ditambahkan'
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menambahkan testimoni',
                'error' => $e->getMessage(), // tampilkan pesan error asli
            ]);
        }
    }

    
    //Display the specified resource.
     
    public function show($id)
    {
        $testimoni = Testimoni::find($id);

        if($testimoni == null) {
            return response()->json([
                'status' => false,
                'message' => 'Testimoni tidak ditemukan'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $testimoni,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $testimoni = Testimoni::find($id);
            
        if($testimoni == null) {
            return response()->json([
                'status' => false,
                'message' => 'Testimoni tidak ditemukan'
            ]);
        }


        $validator = Validator::make($request->all(),[
            'testimoni' => 'required',
            'citation' => 'required|unique:testimoni_tables,citation,'.$id.',id'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $testimoni->testimoni = $request->testimoni; 
        $testimoni->citation = $request->citation; 
        $testimoni->company = $request->company; 
        $testimoni->status = $request->status; 
        $testimoni->save();

        
        
        return response()->json([
            'status' => true,
            'message' => 'Testimoni berhasil diubah'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $testimoni = Testimoni::find($id);

        if($testimoni == null) {
            return response()->json([
                'status' => false,
                'message' => 'Testimoni tidak ditemukan'
            ]);
        }


        $testimoni->delete();

        return response()->json([
            'status' => true,
            'message' => 'testimoni berhasil dihapus',
        ]);
    }
}
