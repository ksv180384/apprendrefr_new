<?php

namespace App\Http\Controllers\Api\Forum;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ForumCreateTopicRequest;
use App\Http\Requests\Api\ForumTopicUpdateRequest;
use App\Models\Forum\Forum;
use App\Models\Forum\Message;
use App\Models\Forum\MessageStatus;
use App\Models\Forum\Status;
use App\Models\Forum\Topic;
use App\Models\User;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ForumRepository;
use App\Repositories\ForumTopicRepository;
use App\Repositories\ProverbRepository;
use App\Repositories\StatisticRepository;
use App\Repositories\UserRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class TopicController extends Controller
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

    /**
     * @var ProverbRepository
     */
    private $proverbRepository;

    public function __construct(){
        $this->forumRepository = app(ForumRepository::class);
        $this->wordRepository = app(WordRepository::class);
        $this->proverbRepository = app(ProverbRepository::class);
        $this->userRepository = app(UserRepository::class);
        $this->statisticRepository = app(StatisticRepository::class);
        $this->forumMessageRepository = app(ForumMessageRepository::class);
        $this->forumTopicRepository = app(ForumTopicRepository::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($forum_id, Request $request)
    {
        $show_hidden = \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());
        $topics = $this->forumTopicRepository->getTopicByForumId((int)$forum_id, $show_hidden);
        $forum = $this->forumRepository->getById((int)$forum_id);
        $proverb = $this->proverbRepository->getRandomProverb(1)[0];
        $statuses = Status::all(['id', 'title', 'alias']);

        $words_list = $this->wordRepository->getRandomWords();
        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

        if($topics->isEmpty()){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        return response()->json([
            'title' => 'Фоорум ',
            'description' => ' - Фоорум ',
            'keywords' => ' - Фоорум',
            'footer' => [
                '2010 - ' . date('Y') . ' гг ApprendereFr.ru',
                'E-mail: admin@apprendrefr.ru'
            ],
            'proverb' => $proverb,
            'data' => [
                'topics' => $topics,
                'forum' => $forum,
                'statuses' => $statuses,
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
