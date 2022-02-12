<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\BaseController;
use App\Repositories\ForumRepository;

class TopicController extends BaseController
{
    public function __construct(){
        parent::__construct();
    }

    public function index($forum_id){


        $forum = $this->forumRepository->getById($forum_id);

        $meta = [
            'title' => 'Фоорум - ' . $forum->title,
            'description' => 'Фоорум - ' . $forum->title,
            'keywords' => 'Форум - ' . $forum->title,
        ];

        return view('index', compact('meta'));
    }

}
