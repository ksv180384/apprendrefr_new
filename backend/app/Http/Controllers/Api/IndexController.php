<?php

namespace App\Http\Controllers\Api;

use App\Services\ForumMessageService;
use App\Services\ProverbService;
use App\Services\StatisticService;
use App\Services\ForumTopicService;
use App\Services\UserService;
use App\Services\WordService;
use Illuminate\Http\JsonResponse;

class IndexController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(
        ForumTopicService $topicService,
        WordService $wordService,
        ProverbService $proverbService,
    ): JsonResponse
    {
        $topics = $topicService->topicsLastActive();
        $words = $wordService->wordsRandom();
        $proverb = $proverbService->proverbRandomOne();

        return response()->json([
            'title' => 'Французский язык - изучение, форум',
            'description' => 'Французский язык - изучение, форум',
            'keywords' => 'Французский язык - изучение, форум',
            'proverb' => $proverb,
            'data' => $topics,
            'words_list' => $words,
        ]);
    }
}
