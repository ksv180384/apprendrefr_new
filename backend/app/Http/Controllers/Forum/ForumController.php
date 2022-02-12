<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\BaseController;
use App\Repositories\ForumRepository;
use Illuminate\Http\Request;

class ForumController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index(){

        $meta = [
            'title' => 'Французский язык - Фоорум',
            'description' => 'Форум для тех кто изучает французский язык',
            'keywords' => 'Форум, французский язык, учить французский язык, ApprendreFr.ru форум',
        ];

        return view('index', compact('meta'));
    }
}
