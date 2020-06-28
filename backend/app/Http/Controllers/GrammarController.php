<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GrammarController extends Controller
{
    public function index(){

        $meta = [
            'title' => 'Французский язык - Грамматика',
            'description' => 'Французский язык - Грамматика',
            'keywords' => 'Французский язык - Грамматика',
        ];

        return view('index', compact('meta'));
    }
}
