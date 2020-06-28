<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LyricsController extends Controller
{
    public function index(){

        $meta = [
            'title' => 'Тексты, транскрипции и переводы французских песен',
            'description' => 'Тексты, транскрипции и переводы французских песен',
            'keywords' => 'Тексты, транскрипции и переводы французских песен',
        ];

        return view('index', compact('meta'));
    }
}
