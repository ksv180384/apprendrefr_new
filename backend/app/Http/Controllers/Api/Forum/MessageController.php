<?php

namespace App\Http\Controllers\Api\Forum;

use App\Http\Controllers\Controller;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ForumRepository;
use App\Repositories\ForumTopicRepository;
use App\Repositories\StatisticRepository;
use App\Repositories\UserRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * @var ForumRepository
     */
    private $forumRepository;

    /**
     * @var WordRepository
     */
    private $wordRepository;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var StatisticRepository
     */
    private $statisticRepository;

    /**
     * @var ForumMessageRepository
     */
    private $forumMessageRepository;

    /**
     * @var ForumTopicRepository
     */
    private $forumTopicRepository;

    public function __construct(){
        $this->forumRepository = app(ForumRepository::class);
        $this->wordRepository = app(WordRepository::class);
        //$this->proverbRepository = app(ProverbRepository::class);
        $this->userRepository = app(UserRepository::class);
        $this->statisticRepository = app(StatisticRepository::class);
        $this->forumMessageRepository = app(ForumMessageRepository::class);
        $this->forumTopicRepository = app(ForumTopicRepository::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @param $forum_id - идентификатор форума
     * @param $topic_id - идентификаотр темы форума
     * @return \Illuminate\Http\Response
     */
    public function index($forum_id, $topic_id)
    {
        //
        $topic = $this->forumTopicRepository->getById((int)$topic_id);
        $forum = $this->forumRepository->getById((int)$forum_id);
        $messages = $this->forumMessageRepository->getByTopicId($topic_id);

        $words_list = $this->wordRepository->getRandomWords();
        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

        return response()->json([
            'title' => 'Фоорум ',
            'description' => ' - Фоорум ',
            'keywords' => ' - Фоорум',
            'footer' => [
                '2010 - ' . date('Y') . ' гг ApprendereFr.ru',
                'E-mail: admin@apprendrefr.ru'
            ],
            'data' => [
                'topic' => $topic,
                'forum' => $forum,
                'messages' => $messages,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
            'words_list' => $words_list,
            'statistic' => [
                'online_users' => $online_users,
                'count_guests' => $count_guests,
                'count_users' => $count_users,
                'count_all' => $count_all,
                'count_users_register' => $count_users_register,
                'count_messages' => $count_messages,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
