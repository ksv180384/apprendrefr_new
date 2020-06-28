<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ForumController extends Controller
{
    public function index(){

        $meta = [
            'title' => 'Французский язык - Фоорум',
            'description' => 'Форум для тех кто изучает французский язык',
            'keywords' => 'Форум, французский язык, учить французский язык, ApprendreFr.ru форум',
        ];

        return view('index', compact('meta'));
    }
}
