<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class MitraController extends Controller
{
    public function index() {
        $mitra = Mitra::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $mitra
        ]);
    } 


    public function store(Request $request) {

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:mitras,slug',

        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $mitra = new Mitra();
        $mitra->title = $request->title;
        $mitra->slug = Str::slug($request->slug);
        $mitra->status = $request->status;
        $mitra->save();

        if($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.',$tempImage->name); 
                $ext = last($extArray);

                $fileName =strtotime('now').$mitra->id.'.'.$ext;

                //Small Thumbnail
                $manager = new ImageManager(Driver::class);
                $sourcePath =  public_path('upload/temp/'.$tempImage->name);
                $destPath =  public_path('upload/mitras/small/'.$fileName);
                $image = $manager->read($sourcePath);
                // $image->coverDown(500, 600);
                $image->save($destPath);

                //Large thumbnail
                $destPath =  public_path('upload/mitras/large/'.$fileName);
                $image = $manager->read($sourcePath);
                $manager = new ImageManager(Driver::class);
                $image->scaleDown(1200,);
                $image->save($destPath);

                $mitra->image = $fileName; 
                $mitra->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Mitra berhasil ditambahkan'
        ]);
    }

    public function update($id, Request $request) {

        $mitra = Mitra::find($id);

        if($mitra == null) {
            return response()->json([
                'status' => false,
                'message' => 'Mitra tidak ditemukan'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:mitras,slug,'.$id.',id',

        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }


        $mitra->title = $request->title;
        $mitra->slug = Str::slug($request->slug);
        $mitra->status = $request->status;
        $mitra->save();

        if($request->imageId > 0) {
            $oldImage = $mitra->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.',$tempImage->name); 
                $ext = last($extArray);

                $fileName =strtotime('now').$mitra->id.'.'.$ext;

                //Small Thumbnail
                $manager = new ImageManager(Driver::class);
                $sourcePath =  public_path('upload/temp/'.$tempImage->name);
                $destPath =  public_path('upload/mitras/small/'.$fileName);
                $image = $manager->read($sourcePath);
                // $image->coverDown(400, 500);
                $image->save($destPath);

                //Large thumbnail
                $destPath =  public_path('upload/mitras/large/'.$fileName);
                $image = $manager->read($sourcePath);
                $manager = new ImageManager(Driver::class);
                $image->scaleDown(1200,);
                $image->save($destPath);

                $mitra->image = $fileName; 
                $mitra->save();

                if($oldImage != '') {
                    File::delete(public_path('upload/services/large/'.$oldImage));
                    File::delete(public_path('upload/services/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Mitra berhasil diupdate'
        ]);
    }

    public function show($id) {
        $mitra = Mitra::find($id);

        if($mitra == null) {
            return response()->json([
                'status' => false,
                'message' => 'Mitra tidak ditemukan'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $mitra
        ]);
    }

    public function destroy($id) {
        $mitra = Mitra::find($id);

        if($mitra == null) {
            return response()->json([
                'status' => false,
                'message' => 'Mitra tidak ditemukan'
            ]);
        }

        File::delete(public_path('upload/mitras/large/'.$mitra->image));
        File::delete(public_path('upload/mitras/small/'.$mitra->image));

        $mitra->delete();

        return response()->json([
            'status' => true,
            'message' => 'Mitra berhasil dihapus',
        ]);
    }
}
