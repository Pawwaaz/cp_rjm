<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\MitraController;
use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\TestimoniController;
use App\Http\Controllers\admin\FaqController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\MitraController as FrontMitraController;
use App\Http\Controllers\front\ArticleController as FrontArticleController;
use App\Http\Controllers\front\TestimoniController as FrontTestimoniController;
use App\Http\Controllers\front\ContactController;
use App\Http\Controllers\front\FaqController as FrontFaqController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('authenticate',[AuthenticationController::class,'authenticate']);

Route::get('get-services',[FrontServiceController::class,'index']);
Route::get('get-latest-services',[FrontServiceController::class,'latestServices']);
Route::get('get-service-detail/{id}',[FrontServiceController::class,'service']);
Route::get('get-service-total',[FrontserviceController::class,'count']);
Route::post('contact',[ContactController::class,'index']);

Route::get('get-faq',[FrontFaqController::class,'index']);
Route::get('get-faqs/{id}',[FrontFaqController::class,'faq']);


Route::get('get-mitras',[FrontMitraController::class,'index']);
Route::get('get-latest-mitras',[FrontMitraController::class,'latestMitras']);
Route::get('get-mitras-detail/{id}',[FrontMitraController::class,'mitra']);
Route::get('get-mitra-total',[FrontMitraController::class,'count']);

Route::get('get-articles',[FrontArticleController::class,'index']);
Route::get('get-latest-articles',[FrontArticleController::class,'latestArticles']);
Route::get('get-articles-detail/{id}',[FrontArticleController::class,'article']);
Route::get('get-articles-total',[FrontArticleController::class,'count']);

Route::get('get-testimoni',[FrontTestimoniController::class,'index']);
Route::get('get-testimoni-total',[FrontTestimoniController::class,'count']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum']], function(){
    //Protected Route
    Route::get('dashboard',[DashboardController::class,'index']);
    Route::get('logout',[AuthenticationController::class,'logout']);
    Route::put('profile',[AdminController::class, 'updateProfileAdmin']);

    //Service Route
    Route::post('services',[ServiceController::class,'store']);
    Route::get('services',[ServiceController::class,'index']);
    Route::put('services/{id}',[ServiceController::class,'update']);
    Route::get('services/{id}',[ServiceController::class,'show']);
    Route::delete('services/{id}',[ServiceController::class,'destroy']);

    //Mitra Route
    Route::post('mitra',[MitraController::class,'store']);
    Route::get('mitra',[MitraController::class,'index']);
    Route::put('mitra/{id}',[MitraController::class,'update']);
    Route::get('mitra/{id}',[MitraController::class,'show']);
    Route::delete('mitra/{id}',[MitraController::class,'destroy']);

    //Article Route
    Route::post('article',[ArticleController::class,'store']);
    Route::get('article',[ArticleController::class,'index']);
    Route::get('article/{id}',[ArticleController::class,'show']);
    Route::put('article/{id}',[ArticleController::class,'update']);
    Route::delete('article/{id}',[ArticleController::class,'destroy']);

    //Testimoni Route
    Route::post('testimoni',[TestimoniController::class,'store']);
    Route::get('testimoni',[TestimoniController::class,'index']);
    Route::get('testimoni/{id}',[TestimoniController::class,'show']);
    Route::put('testimoni/{id}',[TestimoniController::class,'update']);
    Route::delete('testimoni/{id}',[TestimoniController::class,'destroy']);

    //Faq Route
    Route::post('faq',[FaqController::class,'store']);
    Route::get('faq',[FaqController::class,'index']);
    Route::get('faq/{id}',[FaqController::class,'show']);
    Route::put('faq/{id}',[FaqController::class,'update']);
    Route::delete('faq/{id}',[FaqController::class,'destroy']);

    //Temp Image Route
    Route::post('temp-images',[TempImageController::class,'store']);

});