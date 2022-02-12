<?php

namespace App\Http\Controllers\Api;

use App\Services\ForumMessageService;
use App\Services\ProverbService;
use App\Services\StatisticService;
use App\Services\ForumTopicService;
use App\Services\UserService;
use App\Services\WordService;

class IndexController extends BaseController
{
    /**
     * @var ForumTopicService
     */
    private $topicService;

    /**
     * @var WordService
     */
    private $wordService;

    /**
     * @var ProverbService
     */
    private $proverbService;

    /**
     * @var StatisticService
     */
    private $statisticService;

    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var ForumMessageService
     */
    private $forumMessageService;


    public function __construct(
        ForumTopicService $topicService,
        WordService $wordService,
        ProverbService $proverbService,
        StatisticService $statisticService,
        UserService $userService,
        ForumMessageService $forumMessageService
    )
    {
        parent::__construct();
        $this->topicService = $topicService;
        $this->wordService = $wordService;
        $this->proverbService = $proverbService;
        $this->statisticService = $statisticService;
        $this->userService = $userService;
        $this->forumMessageService = $forumMessageService;
    }


    public function index(){
        $topics = $this->topicService->topicsLastActive();
        $words = $this->wordService->wordsRandom();
        $proverb = $this->proverbService->proverbRandomOne();
        $usersOnline = $this->statisticService->onlineUsers();
        $usersOnlineCount = $usersOnline->count();
        $guestsCount = $this->statisticService->countGuests();
        $usersRegisterCount = $this->userService->countUsersRegister();
        $usersOnlineAllCount = $usersOnlineCount + $guestsCount;
        $countAllMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        return response()->json([
            'title' => 'Французский язык - изучение, форум',
            'description' => 'Французский язык - изучение, форум',
            'keywords' => 'Французский язык - изучение, форум',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => $topics,
            'user' => $user,
            'auth' => \Auth::check(),
            'words_list' => $words,
            'statistic' => [
                'online_users' => $usersOnline,
                'count_users' => $usersOnlineCount,
                'count_guests' => $guestsCount,
                'count_users_register' => $usersRegisterCount,
                'count_all' => $usersOnlineAllCount,
                'count_messages' => $countAllMessages,
            ],
        ]);
    }
}
