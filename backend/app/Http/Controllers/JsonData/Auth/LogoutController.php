<?php

namespace App\Http\Controllers\JsonData\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
        if(\Auth::user()){
            \Auth::logout();
        }

        return response()->json([
            'auth' => false,
            'user' => [],
        ], 200);
    }
}
