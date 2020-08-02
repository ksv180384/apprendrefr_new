<?php

namespace App\Http\Controllers\Api\Forum;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ForumMessageCreateRequest;
use App\Http\Requests\Api\ForumMessageHideRequest;
use App\Http\Requests\Api\ForumMessageUpdateRequest;
use App\Models\Forum\Forum;
use App\Models\Forum\ForumTopicViewed;
use App\Models\Forum\Message;
use App\Models\Forum\MessageStatus;
use App\Models\Forum\Status;
use App\Models\Forum\Topic;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ForumRepository;
use App\Repositories\ForumTopicRepository;
use App\Repositories\ForumTopicViewedRepository;
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
     * @var ForumTopicViewedRepository
     */
    private $forumTopicViewedRepository;

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
        $this->forumTopicViewedRepository = app(ForumTopicViewedRepository::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @param $forum_id - идентификатор форума
     * @param $topic_id - идентификаотр темы форума
     * @return \Illuminate\Http\Response
     */
    public function index($forum_id, $topic_id, Request $request)
    {
        // Показывать ли скрытые сообщения
        $show_hidden_message = $request->show_hide_mess == 'show';
        $show_hidden_message =  $show_hidden_message && \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());


        $topic = $this->forumTopicRepository->getById((int)$topic_id);
        $forum = $this->forumRepository->getById((int)$forum_id);

        $messages = $this->forumMessageRepository->getByTopicId((int)$topic_id, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));
        //var_export($messages->toArray());

        $words_list = $this->wordRepository->getRandomWords();
        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

        if(count($messages) == 0){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $m = $messages->toArray();
        if($m['last_page'] == $m['current_page']){
            // Помечаем тему как просмотренную
            $this->forumTopicViewedRepository->viewedTopic($topic_id);
        }

        return response()->json([
            'title' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'description' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'keywords' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
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

    public function getMessagesPaginate($forum_id, $topic_id, Request $request){
        // Показывать ли скрытые сообщения
        $show_hidden_message = $request->show_hide_mess == 'show';
        $show_hidden_message =  $show_hidden_message && \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());

        $topic = $this->forumTopicRepository->getById((int)$topic_id);
        $messages = $this->forumMessageRepository->getByTopicId((int)$topic_id, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        if(count($messages) == 0){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $m = $messages->toArray();
        if($m['last_page'] == $m['current_page']){
            // Помечаем тему как просмотренную
            $this->forumTopicViewedRepository->viewedTopic($topic_id);
        }

        return response()->json([
            'title' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'description' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'keywords' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'messages' => $messages,
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
    public function store(ForumMessageCreateRequest $request)
    {
        // Показывать ли скрытые сообщения
        $show_hidden_message = $request->show_hide_mess == 'show';
        $show_hidden_message =  $show_hidden_message && \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());

        $status = MessageStatus::select(['id', 'title', 'alias'])->where('alias', '=', 'visible_everyone')->first();
        $topic = $this->forumTopicRepository->getById($request->topic);

        if($topic->status_topic_alias != 'visible_everyone' &&
           $topic->status_topic_alias != 'visible_only_registered_users')
        {
            return response()->json(['message' => 'Тема закрыта для сообщений.'], 404);
        }

        $message_id = Message::create([
            'message' => $request->message,
            'topic_id' => $request->topic,
            'user_id' => \Auth::id(),
            'status' => $status->id,
        ])->id;

        $topic = Topic::select(['id', 'forum_id', 'status'])->where('id', '=', $request->topic)->first();
        $topic->update(['last_message_id' => $message_id]);
        Forum::where('id', '=', $topic->forum_id)->first()->update(['last_message_id' => $message_id]);

        $topic = $this->forumTopicRepository->getById($request->topic);
        $messages = $this->forumMessageRepository->getByTopicIdLastPage($request->topic, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        // Помечаем тему как просмотренную
        $this->forumTopicViewedRepository->viewedTopic($request->topic);

        return response()->json([
            'title' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'description' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'keywords' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'messages' => $messages,
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
    public function update(ForumMessageUpdateRequest $request, $id)
    {
        //
        $message = Message::select(['id', 'topic_id', 'message', 'user_id'])->where('id', '=', $id)->first();
        $user = $this->userRepository->getById(\Auth::id());
        if(!$message){
            return response()->json(['message' => 'Неудалось найти редактируемое сообщение.'], 404);
        }
        if($message->user_id !== \Auth::id() && $user->admin == 0 && $user->rang_alias != 'administrator'){
            return response()->json(['message' => 'У вас недостаточно прав для редактирования этого сообщения'], 404);
        }

        $message->update(['message' => $request->message]);

        $messages = $this->forumMessageRepository->getByTopicIdLastPage($message->topic_id);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        return response()->json([
            'messages' => $messages,
        ]);
    }

    public function hide(ForumMessageHideRequest $request){

        $show_hidden_message = $request->show_hide_mess == 'show';
        $show_hidden_message =  $show_hidden_message && \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());

        $message = Message::select(['id', 'topic_id', 'status'])->where('id', '=', $request->message_id)->first();
        $statuses = $this->forumMessageRepository->getStatusList();

        $mew_status_id = 0;
        foreach ($statuses as $item){
            if($message->status != $item->id) {
                $mew_status_id = $item->id;
                 break;
            }
        }

        $message->update(['status' => $mew_status_id]);

        // Получаем последнеесообщение темы
        $last_message_topic = Message::select(['forum_messages.id'])
                                ->leftJoin('forum_message_status', 'forum_messages.status', 'forum_message_status.id')
                                ->where('topic_id', '=', $message->topic_id)
                                ->where('forum_message_status.alias', '<>', 'hidden')
                                ->orderBy('created_at', 'DESC')->first();

        $t = Topic::select(['id', 'forum_id'])->where('id', '=', $message->topic_id)->first();
        $t->update(['last_message_id' => $last_message_topic->id]);

        // Получам последнее сообщение форума
        $m = Message::select(['forum_messages.id'])
            ->leftJoin('forum_topics', 'forum_messages.topic_id', 'forum_topics.id')
            ->leftJoin('forum_message_status', 'forum_messages.status', 'forum_message_status.id')
            ->leftJoin('forum_statuses', 'forum_topics.status', 'forum_statuses.id')
            ->where('forum_topics.forum_id', '=', $t->forum_id)
            ->where('forum_statuses.alias', '<>', 'hidden')
            ->where('forum_message_status.alias', '<>', 'hidden')
            ->orderBy('forum_messages.created_at', 'DESC')
            ->first();
        Forum::where('id', '=', $t->forum_id)->first()->update(['last_message_id' => $m->id]);

        $messages = $this->forumMessageRepository->getByTopicId($message->topic_id, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        return response()->json([
            'messages' => $messages,
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

    // Убирает информацию о пользователе взависимости от выставленных на нее прав
    private function filterInfo($messages){

        if(\Auth::check()){ // для зарегистрированных пользователей
            foreach ($messages as $k=>$item){
                if($item->config_email_alias != 'zaregistrirovannym' && $item->config_email_alias != 'vsem'){
                    $messages[$k]->user_email = null;
                }
                if($item->config_facebook_alias != 'zaregistrirovannym' && $item->config_facebook_alias != 'vsem'){
                    $messages[$k]->info_facebook = null;
                }
                if($item->config_info_alias != 'zaregistrirovannym' && $item->config_info_alias != 'vsem'){
                    $messages[$k]->user_info = null;
                }
                if($item->config_instagram_alias != 'zaregistrirovannym' && $item->config_instagram_alias != 'vsem'){
                    $messages[$k]->info_instagram = null;
                }
                if($item->config_odnoklassniki_alias != 'zaregistrirovannym' && $item->config_odnoklassniki_alias != 'vsem'){
                    $messages[$k]->info_odnoklassniki = null;
                }
                if($item->config_residence_alias != 'zaregistrirovannym' && $item->config_residence_alias != 'vsem'){
                    $messages[$k]->user_residence = null;
                }
                if($item->config_sex_alias != 'zaregistrirovannym' && $item->config_sex_alias != 'vsem'){
                    $messages[$k]->user_sex_title = null;
                    $messages[$k]->user_sex_id = null;
                }
                if($item->config_skype_alias != 'zaregistrirovannym' && $item->config_skype_alias != 'vsem'){
                    $messages[$k]->info_skype = null;
                }
                if($item->config_telegram_alias != 'zaregistrirovannym' && $item->config_telegram_alias != 'vsem'){
                    $messages[$k]->info_telegram = null;
                }
                if($item->config_twitter_alias != 'zaregistrirovannym' && $item->config_twitter_alias != 'vsem'){
                    $messages[$k]->info_twitter = null;
                }
                if($item->config_vk_alias != 'zaregistrirovannym' && $item->config_vk_alias != 'vsem'){
                    $messages[$k]->info_vk = null;
                }
                if($item->config_whatsapp_alias != 'zaregistrirovannym' && $item->config_whatsapp_alias != 'vsem'){
                    $messages[$k]->info_whatsapp = null;
                }
                if($item->config_youtube_alias != 'zaregistrirovannym' && $item->config_youtube_alias != 'vsem'){
                    $messages[$k]->info_youtube = null;
                }
                if($item->config_viber_alias != 'zaregistrirovannym' && $item->config_viber_alias != 'vsem'){
                    $messages[$k]->info_viber = null;
                }
            }
        }elseif(false){ // для друзей

        }else{ // для всех
            foreach ($messages as $k=>$item){
                if($item->config_email_alias != 'vsem'){
                    $messages[$k]->user_email = null;
                }
                if($item->config_facebook_alias != 'vsem'){
                    $messages[$k]->info_facebook = null;
                }
                if($item->config_info_alias != 'vsem'){
                    $messages[$k]->user_info = null;
                }
                if($item->config_instagram_alias != 'vsem'){
                    $messages[$k]->info_instagram = null;
                }
                if($item->config_odnoklassniki_alias != 'vsem'){
                    $messages[$k]->info_odnoklassniki = null;
                }
                if($item->config_residence_alias != 'vsem'){
                    $messages[$k]->user_residence = null;
                }
                if($item->config_sex_alias != 'vsem'){
                    $messages[$k]->user_sex_title = null;
                    $messages[$k]->user_sex_id = null;
                }
                if($item->config_skype_alias != 'vsem'){
                    $messages[$k]->info_skype = null;
                }
                if($item->config_telegram_alias != 'vsem'){
                    $messages[$k]->info_telegram = null;
                }
                if($item->config_twitter_alias != 'vsem'){
                    $messages[$k]->info_twitter = null;
                }
                if($item->config_vk_alias != 'vsem'){
                    $messages[$k]->info_vk = null;
                }
                if($item->config_whatsapp_alias != 'vsem'){
                    $messages[$k]->info_whatsapp = null;
                }
                if($item->config_youtube_alias != 'vsem'){
                    $messages[$k]->info_youtube = null;
                }
                if($item->config_viber_alias != 'vsem'){
                    $messages[$k]->info_viber = null;
                }
            }
        }

        return $messages;
    }

    // Формирует url на соц сети
    private function formatSocialLinks($messages){
        foreach ($messages as $k=>$item){
            $messages[$k]->info_facebook_link = 'https://fb.com/' . $item['info_facebook'];
            $messages[$k]->info_odnoklassniki_link = 'https://ok.ru/' . $item['info_odnoklassniki'];
            $messages[$k]->info_twitter_link = 'https://twitter.com/' . $item['info_twitter'];
            $messages[$k]->info_vk_link = 'https://vk.com/' . $item['info_vk'];
            $messages[$k]->info_youtube_link = 'https://youtube.com/' . $item['info_youtube'];
            $messages[$k]->info_instagram_link = 'https://instagram.com/' . $item['info_instagram'];
        }

        return $messages;
    }
}
