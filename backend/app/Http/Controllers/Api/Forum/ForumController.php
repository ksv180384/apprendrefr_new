<?php

namespace App\Http\Controllers\Api\Forum;

use App\Http\Controllers\Api\BaseController;

use App\Services\ForumMessageService;
use App\Services\ForumService;
use App\Services\ProverbService;
use App\Services\StatisticService;
use App\Services\UserService;
use App\Services\WordService;

class ForumController extends BaseController
{
    /**
     * @var ForumService
     */
    private $forumService;

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
        ForumService $forumService,
        WordService $wordService,
        ProverbService $proverbService,
        StatisticService $statisticService,
        UserService $userService,
        ForumMessageService $forumMessageService
    ){
        parent::__construct();
        $this->forumService = $forumService;
        $this->wordService = $wordService;
        $this->proverbService = $proverbService;
        $this->statisticService = $statisticService;
        $this->userService = $userService;
        $this->forumMessageService = $forumMessageService;

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $forums = $this->forumService->getList();
        $words_list = $this->wordService->wordsRandom();
        $proverb = $this->proverbService->proverbRandomOne();

        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        return response()->json([
            'title' => 'Французский язык - Фоорум',
            'description' => 'Форум для тех кто изучает французский язык',
            'keywords' => 'Форум, французский язык, учить французский язык, ApprendreFr.ru форум',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => $forums,
            'user' => $user,
            'auth' => \Auth::check(),
            'words_list' => $words_list,
            'statistic' => [
                'online_users' => $onlineUsers,
                'count_guests' => $countGuests,
                'count_users' => $countUsers,
                'count_all' => $countAll,
                'count_users_register' => $countUsersRegister,
                'count_messages' => $countMessages,
            ],
        ]);
    }
}
