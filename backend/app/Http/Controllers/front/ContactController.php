<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Mail\ContactEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index(Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ]);
                
        }
        $emailData = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
        ]; 

        Mail::to('rafi_jana@yahoo.com')->send(new ContactEmail($emailData));
        return response()->json([
            'status' => true,
            'message' => 'Terimakasih email anda sudah terkirim',
        ]);
    }
}
