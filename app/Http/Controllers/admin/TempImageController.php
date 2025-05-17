<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'image' => 'required|mimes:png,jpg,jpeg,gif' 
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $imageName = strtotime('now').'.'.$ext;

        //Save data
        $model = new TempImage();
        $model->name = $imageName;
        $model->save();


        $image->move(public_path('upload/temp'),$imageName);

        //Small Thumbnail
        $manager = new ImageManager(Driver::class);
        $sourcePath =  public_path('upload/temp/'.$imageName);
        $destPath =  public_path('upload/temp/thumb/'.$imageName);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destPath);

        return response()->json([
            'status' => true,
            'data' => $model,
            'messege' => 'Gambar berhasil di upload'
        ]);
        
    }
}
