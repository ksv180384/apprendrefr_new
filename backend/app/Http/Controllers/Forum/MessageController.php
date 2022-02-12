<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\BaseController;
use App\Services\ForumService;
use App\Services\ForumTopicService;
use Illuminate\Http\Request;

class MessageController extends BaseController
{
    /**
     * @var ForumService
     */
    private $forumService;

    /**
     * @var ForumTopicService
     */
    private $forumTopicService;


    public function __construct(ForumService $forumService, ForumTopicService $forumTopicService){
        parent::__construct();
        $this->forumService = $forumService;
        $this->forumTopicService = $forumTopicService;
    }

    //
    public function index($forum_id, $topic_id, Request $request)
    {
        $topic = $this->forumTopicService->getById($topic_id);

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
