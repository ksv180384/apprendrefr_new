<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends BaseController
{
    //
    public function index(){

        $title = 'Французский язык - изучение, форум';

        return view('index', compact('title'));
    }
}
