<?php

namespace App\Http\Controllers\Api\Forum;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\ForumCreateTopicRequest;
use App\Http\Requests\Api\ForumTopicUpdateRequest;
use App\Models\Forum\Forum;
use App\Models\Forum\Message;
use App\Models\Forum\MessageStatus;
use App\Models\Forum\Status;
use App\Models\Forum\Topic;
use App\Models\User;
use App\Services\ForumMessageService;
use App\Services\ForumService;
use App\Services\ForumTopicService;
use App\Services\ProverbService;
use App\Services\StatisticService;
use App\Services\UserService;
use App\Services\WordService;
use Illuminate\Http\Request;

class TopicController extends BaseController
{
    /**
     * @var ForumService
     */
    private $topicService;

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
        ForumTopicService $topicService,
        ForumService $forumService,
        WordService $wordService,
        ProverbService $proverbService,
        StatisticService $statisticService,
        UserService $userService,
        ForumMessageService $forumMessageService
    ){
        parent::__construct();
        $this->topicService = $topicService;
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
    public function index($forum_id, Request $request)
    {
        $show_hidden = \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());
        $topics = $this->topicService->getTopicByForumId((int)$forum_id, $show_hidden);
        $forum = Forum::find($forum_id, ['id', 'title']);
        $proverb = $this->proverbService->proverbRandomOne();
        $statuses = Status::all(['id', 'title', 'alias']);

        $wordsList = $this->wordService->wordsRandom();
        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        if($topics->isEmpty()){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        return response()->json([
            'title' => 'Фоорум ',
            'description' => ' - Фоорум ',
            'keywords' => ' - Фоорум',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => [
                'topics' => $topics,
                'forum' => $forum,
                'statuses' => $statuses,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
            'words_list' => $wordsList,
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ForumCreateTopicRequest $request)
    {
        //
        if(empty(strip_tags($request->message))){
            return response()->json([
                'messages' => 'Слишком короткое сообщение.',
            ], 404);
        }
        $status = Status::select(['id', 'title', 'alias'])->where('alias', '=', 'visible_everyone')->first();
        $message_status = MessageStatus::select(['id', 'title', 'alias'])->where('alias', '=', 'visible_everyone')->first();

        $topic_id = Topic::create([
            'forum_id' => $request->forum_id,
            'title' => $request->topic_title,
            'user_id' => \Auth::id(),
            'status' => $status->id,
        ])->id;

        $message_id = Message::create([
            'message' => $request->message,
            'topic_id' => $topic_id,
            'user_id' => \Auth::id(),
            'status' => $message_status->id,
        ])->id;

        $topic = Topic::select(['id', 'forum_id'])->where('id', '=', $topic_id)->first();
        $topic->update(['last_message_id' => $message_id]);
        Forum::where('id', '=', $request->forum_id)->first()->update(['last_message_id' => $message_id]);

        return response()->json([
            'messages' => 'Тема форума успешно добавлена.',
            'data' => [
                'topic_id' => $topic_id,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ForumTopicUpdateRequest $request, $id)
    {
        //
        $topic = Topic::select(['id', 'title', 'forum_id', 'user_id'])->where('id', '=', $id)->first();
        $user = $this->userRepository->getById(\Auth::id());

        if(!$topic){
            return response()->json(['message' => 'Неудалось найти редактируемую тему форума.'], 404);
        }
        if($topic->user_id !== \Auth::id() && $user->admin == 0 &&
            $user->rang_alias != 'administrator' && $user->rang_alias != 'moderator')
        {
            return response()->json(['message' => 'У вас недостаточно прав для редактирования этой темы форума.'], 404);
        }

        $topic->update([
            'title' => $request->title,
        ]);

        return response()->json([
            'messages' => 'Тема форума успешно отредактирована.',
            'data' => [
                'topic' => $topic,
            ]
        ]);
    }

    public function updateStatus(Request $request){
        $topic = Topic::select(['id', 'title', 'forum_id', 'user_id'])->where('id', '=', (int)$request->topic_id)->first();
        $user = $this->userRepository->getById(\Auth::id());

        if(!$topic){
            return response()->json(['message' => 'Неудалось найти тему форума.'], 404);
        }
        if($user->admin == 0 && $user->rang_alias != 'administrator' && $user->rang_alias != 'moderator')
        {
            return response()->json([
                'message' => 'У вас недостаточно прав для редактирования этой темы форума.'
            ], 404);
        }
        $status = Status::select(['id'])->where('id', '=', (int)$request->status_id)->first();
        if(!$status){
            return response()->json(['message' => 'Неверно задан статус.'], 404);
        }

        $topic->update([
            'status' => $status->id,
        ]);

        // Получам последнее сообщение форума
        $message = Message::select(['forum_messages.id'])
            ->leftJoin('forum_topics', 'forum_messages.topic_id', 'forum_topics.id')
            ->leftJoin('forum_message_status', 'forum_messages.status', 'forum_message_status.id')
            ->leftJoin('forum_statuses', 'forum_topics.status', 'forum_statuses.id')
            ->where('forum_topics.forum_id', '=', $topic->forum_id)
            ->where('forum_statuses.alias', '<>', 'hidden')
            ->where('forum_message_status.alias', '<>', 'hidden')
            ->orderBy('forum_messages.created_at', 'DESC')
            ->first();
        $mess_id = !empty($message->id) ? $message->id : null;
        Forum::where('id', '=', $topic->forum_id)->first()->update(['last_message_id' => $mess_id]);

        $show_hidden = \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());
        $topics = $this->forumTopicRepository->getTopicByForumId($topic->forum_id, $show_hidden);

        return response()->json([
            'messages' => 'Тема форума успешно отредактирована.',
            'data' => [
                'topics' => $topics,
            ]
        ]);
    }
}
