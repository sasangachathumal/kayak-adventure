<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Mail;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public static function getPost()
    {
        return Post::orderBy('id', 'DESC')->get();
    }

    public function sendEmail(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'message' => 'required'
        ]);

        $data=['name'=>$request->name, 'email'=>$request->email, 'message'=>$request->message];
        $user['to']='contact@kayakadventure.lk';
        $user['subject']='Kayak Adventure Contact';

        Mail::send('contactMail',$data,function($messages) use ($user) {
            $messages->to($user['to']);
            $messages->subject($user['subject']);
        });

        return response()->json(['success' => true]);
    }
}
