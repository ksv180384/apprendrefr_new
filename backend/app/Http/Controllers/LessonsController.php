<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LessonsController extends Controller
{
    public function index(){

        $meta = [
            'title' => 'Уроки французского языка',
            'description' => 'Уроки французского языка. Каждый урок французского языка для начинающих представлен в виде темы для общения.',
            'keywords' => 'Уроки французского языка',
        ];

        return view('index', compact('meta'));
    }
}
