<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\BaseController;
use App\Repositories\ForumRepository;
use App\Repositories\ForumTopicRepository;
use Illuminate\Http\Request;

class MessageController extends BaseController
{
    /**
     * @var ForumRepository
     */
    private $forumRepository;

    /**
     * @var ForumTopicRepository
     */
    private $forumTopicRepository;


    public function __construct(){
        $this->forumRepository = app(ForumRepository::class);
        $this->forumTopicRepository = app(ForumTopicRepository::class);
    }

    //
    public function index($forum_id, $topic_id, Request $request)
    {
        $topic = $this->forumTopicRepository->getById($topic_id);
        //$forum = $this->forumRepository->getById($forum_id);

        $title = $topic->title . ' - Фоорум';
        if(!empty($request->page)){
            $title = $topic->title . ' - Фоорум (стр ' . $request->page . ')';
        }

        $meta = [
            'title' => $title,
            'description' => $title,
            'keywords' => $title,
        ];

        return view('index', compact('meta'));
    }
}
