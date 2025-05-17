<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    public function index() {
        $article = Article::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }


    public function show($id) {
        $article = Article::find($id);

        if($article == null) {
            return response()->json([
                'status' => false,
                'message' => 'Artikel tidak ditemukan'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $article,
        ]);
    }

    public function store(Request $request) {

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:articles,slug',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ]);
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        //Save temp image
        if($request->imageId > 0) {
            $oldImage = $article->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.',$tempImage->name); 
                $ext = last($extArray);

                $fileName =strtotime('now').$article->id.'.'.$ext;

                //Small Thumbnail
                $manager = new ImageManager(Driver::class);
                $sourcePath =  public_path('upload/temp/'.$tempImage->name);
                $destPath =  public_path('upload/articles/small/'.$fileName);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($destPath);

                //Large thumbnail
                $destPath =  public_path('upload/articles/large/'.$fileName);
                $image = $manager->read($sourcePath);
                $manager = new ImageManager(Driver::class);
                $image->scaleDown(1200,);
                $image->save($destPath);

                $article->image = $fileName; 
                $article->save();
                
                if($oldImage != '') {
                    File::delete(public_path('upload/articles/large/'.$oldImage));
                    File::delete(public_path('upload/articles/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Artikel berhasil ditambahkan',
        ]);
    }

    public function update(Request $request, $id)
    {
        $article = Article::find($id);
            
        if($article == null) {
            return response()->json([
                'status' => false,
                'message' => 'Artikel tidak ditemukan'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:articles,slug,'.$id.',id'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        //Save temp image
        if($request->imageId > 0) {
            $oldImage = $article->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.',$tempImage->name); 
                $ext = last($extArray);

                $fileName =strtotime('now').$article->id.'.'.$ext;

                //Small Thumbnail
                $manager = new ImageManager(Driver::class);
                $sourcePath =  public_path('upload/temp/'.$tempImage->name);
                $destPath =  public_path('upload/articles/small/'.$fileName);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                //Large thumbnail
                $destPath =  public_path('upload/articles/large/'.$fileName);
                $image = $manager->read($sourcePath);
                $manager = new ImageManager(Driver::class);
                $image->scaleDown(1200,);
                $image->save($destPath);

                $article->image = $fileName; 
                $article->save();
                
                if($oldImage != '') {
                    File::delete(public_path('upload/articles/large/'.$oldImage));
                    File::delete(public_path('upload/articles/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Layanan berhasil diubah'
        ]);
    }

    public function destroy($id) {
        $article = Article::find($id);

        if($article == null) {
            return response()->json([
                'status' => false,
                'message' => 'Artikel tidak ditemukan'
            ]);
        }

        File::delete(public_path('upload/articles/large/'.$article->image));
        File::delete(public_path('upload/articles/small/'.$article->image));

        $article->delete();

        return response()->json([
            'status' => true,
            'message' => 'Artikel berhasil dihapus',
        ]);
    }

    
}
