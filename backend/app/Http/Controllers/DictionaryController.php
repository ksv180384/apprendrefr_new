<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DictionaryController extends Controller
{
    public function index(){

        $meta = [
            'title' => 'Французско-русский словарь',
            'description' => 'Французско-русский словарь online',
            'keywords' => '',
        ];

        return view('index', compact('meta'));
    }
}
