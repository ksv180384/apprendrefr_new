<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\BaseController;
use App\Repositories\ForumRepository;
use Illuminate\Http\Request;

class ForumController extends BaseController
{
    /**
     * @var ForumRepository
     */
    private $forumRepository;

    public function __construct()
    {
        $this->forumRepository = app(ForumRepository::class);
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
