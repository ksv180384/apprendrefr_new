<?php

namespace App\Http\Controllers\Api\Forum;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\ForumMessageCreateRequest;
use App\Http\Requests\Api\ForumMessageHideRequest;
use App\Http\Requests\Api\ForumMessageUpdateRequest;
use App\Models\Forum\Forum;
use App\Models\Forum\ForumMessage;
use App\Models\Forum\ForumMessageStatus;
use App\Models\Forum\ForumTopic;
use App\Services\ForumMessageService;
use App\Services\ForumService;
use App\Services\ForumTopicService;
use App\Services\ForumTopicViewedService;
use App\Services\ProverbService;
use App\Services\StatisticService;
use App\Services\UserService;
use App\Services\WordService;
use Illuminate\Http\Request;

class MessageController extends BaseController
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
     * @var UserService
     */
    private $userService;

    /**
     * @var StatisticService
     */
    private $statisticService;

    /**
     * @var ForumMessageService
     */
    private $forumMessageService;

    /**
     * @var ForumTopicService
     */
    private $forumTopicService;

    /**
     * @var ForumTopicViewedService
     */
    private $forumTopicViewedService;

    public function __construct(
        ForumService $forumService,
        WordService $wordService,
        ProverbService $proverbService,
        UserService $userService,
        StatisticService $statisticService,
        ForumMessageService $forumMessageService,
        ForumTopicService $forumTopicService,
        ForumTopicViewedService $forumTopicViewedService
    ){
        $this->middleware(['auth:api','confirm_email'], [
            'only' => ['store', 'update', 'hide', 'destroy'] // методы для выполнения которых нужна проверка пользователя
        ]);

        $this->forumService = $forumService;
        $this->wordService = $wordService;
        $this->proverbService = $proverbService;
        $this->statisticService = $statisticService;
        $this->userService = $userService;
        $this->forumMessageService = $forumMessageService;
        $this->forumTopicService = $forumTopicService;
        $this->forumTopicViewedService = $forumTopicViewedService;
        parent::__construct();
    }

    /**
     * Display a listing of the resource.
     *
     * @param $forum_id - идентификатор форума
     * @param $topic_id - идентификаотр темы форума
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($forum_id, $topic_id, Request $request)
    {
        // Показывать ли скрытые сообщения
        $show_hidden_message = $request->show_hide_mess == 'show';
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;
        $show_hidden_message = $show_hidden_message && $user && ($user->isAdmin() || $user->isModerator());


        $topic = $this->forumTopicService->getById($topic_id);
        $forum = $this->forumService->getById($forum_id);
        $proverb = $this->proverbService->proverbRandomOne();

        $messages = $this->forumMessageService->getByTopicId($topic_id, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        $wordsList = $this->wordService->wordsRandom();
        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();

        if($messages->count() == 0){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $m = $messages->toArray();
        if($m['last_page'] == $m['current_page']){
            // Помечаем тему как просмотренную
            $this->forumTopicViewedService->viewedTopic($topic_id);
        }
        if($m['current_page'] == 1){
            ForumTopic::where('id', $topic_id)
                ->update([
                    'count_views'=> \DB::raw('count_views+1'),
                ]);
        }

        return response()->json([
            'title' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'description' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'keywords' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'footer' => [
                $this->yar_life,
                self::EMAIL
            ],
            'proverb' => $proverb,
            'data' => [
                'topic' => $topic,
                'forum' => $forum,
                'messages' => $messages,
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

    public function getMessagesPaginate($forum_id, $topic_id, Request $request){
        // Показывать ли скрытые сообщения
        $show_hidden_message = $request->show_hide_mess == 'show';
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;
        $show_hidden_message =  $show_hidden_message && $user && ($user->isAdmin() || $user->isModerator());

        $topic = $this->forumTopicService->getById($topic_id);
        $messages = $this->forumMessageService->getByTopicId($topic_id, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        if(count($messages) == 0){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $m = $messages->toArray();
        if($m['last_page'] == $m['current_page']){
            // Помечаем тему как просмотренную
            $this->forumTopicViewedService->viewedTopic($topic_id);
            ForumTopic::where('id', $topic_id)
                ->update([
                    'count_views'=> \DB::raw('count_views+1'),
                ]);
        }

        return response()->json([
            'title' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'description' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'keywords' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'messages' => $messages,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ForumMessageCreateRequest $request)
    {
        // Показывать ли скрытые сообщения
        $show_hidden_message = $request->show_hide_mess == 'show';
        $show_hidden_message =  $show_hidden_message && \Auth::check() && (\Auth::user()->isAdmin() || \Auth::user()->isModerator());

        $status = ForumMessageStatus::select(['id', 'title', 'alias'])->where('alias', '=', 'visible_everyone')->first();
        $topic = $this->forumTopicService->getById($request->topic);

        if(
            $topic->statusTitle->alias != 'visible_everyone' &&
            $topic->statusTitle->alias != 'visible_only_registered_users'
        )
        {
            return response()->json(['message' => 'Тема закрыта для сообщений.'], 404);
        }

        $message_id = ForumMessage::create([
            'message' => $request->message,
            'topic_id' => $request->topic,
            'user_id' => \Auth::id(),
            'status' => $status->id,
        ])->id;

        $topic = ForumTopic::select(['id', 'forum_id', 'status'])->where('id', '=', $request->topic)->first();
        $topic->update(['last_message_id' => $message_id]);
        Forum::where('id', '=', $topic->forum_id)->first()->update(['last_message_id' => $message_id]);

        $topic = $this->forumTopicService->getById($request->topic);
        $messages = $this->forumMessageService->getByTopicIdLastPage($request->topic, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        // Помечаем тему как просмотренную
        $this->forumTopicViewedService->viewedTopic($request->topic);

        return response()->json([
            'title' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'description' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'keywords' => $topic->title . ' - Фоорум (стр ' . $messages->toArray()['current_page'] . ')',
            'messages' => $messages,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ForumMessageUpdateRequest $request, $id)
    {
        //
        $message = ForumMessage::select(['id', 'topic_id', 'message', 'user_id'])->where('id', '=', $id)->first();
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

        $message = ForumMessage::select(['id', 'topic_id', 'status'])->where('id', '=', $request->message_id)->first();
        $statuses = $this->forumMessageService->getStatusList();

        $mew_status_id = 0;
        foreach ($statuses as $item){
            if($message->status != $item->id) {
                $mew_status_id = $item->id;
                 break;
            }
        }

        $message->update(['status' => $mew_status_id]);

        // Получаем последнеесообщение темы
        $last_message_topic = ForumMessage::select(['forum_messages.id'])
                                ->leftJoin('forum_message_status', 'forum_messages.status', 'forum_message_status.id')
                                ->where('topic_id', '=', $message->topic_id)
                                ->where('forum_message_status.alias', '<>', 'hidden')
                                ->orderBy('created_at', 'DESC')->first();

        $t = ForumTopic::select(['id', 'forum_id'])->where('id', '=', $message->topic_id)->first();
        $t->update(['last_message_id' => $last_message_topic->id]);

        // Получам последнее сообщение форума
        $m = ForumMessage::select(['forum_messages.id'])
            ->leftJoin('forum_topics', 'forum_messages.topic_id', 'forum_topics.id')
            ->leftJoin('forum_message_status', 'forum_messages.status', 'forum_message_status.id')
            ->leftJoin('forum_statuses', 'forum_topics.status', 'forum_statuses.id')
            ->where('forum_topics.forum_id', '=', $t->forum_id)
            ->where('forum_statuses.alias', '<>', 'hidden')
            ->where('forum_message_status.alias', '<>', 'hidden')
            ->orderBy('forum_messages.created_at', 'DESC')
            ->first();
        Forum::where('id', '=', $t->forum_id)->first()->update(['last_message_id' => $m->id]);

        $messages = $this->forumMessageService->getByTopicId($message->topic_id, $show_hidden_message);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        return response()->json([
            'messages' => $messages,
        ]);
    }


    // Убирает информацию о пользователе взависимости от выставленных на нее прав
    private function filterInfo($messages){

        if(\Auth::check()){ // для зарегистрированных пользователей
            foreach ($messages as $k=>$item){

                if(!empty($item->config->email) && $item->user->config->email->alias != 'zaregistrirovannym' && $item->user->config->email->alias != 'vsem'){
                    $messages[$k]->user->info->email = null;
                }
                if(!empty($item->config->facebook) && $item->config->facebook->alias != 'zaregistrirovannym' && $item->config->facebook->alias != 'vsem'){
                    $messages[$k]->user->info->facebook = null;
                }
                if(!empty($item->config->info) && $item->user->config->info->alias != 'zaregistrirovannym' && $item->user->config->info->alias != 'vsem'){
                    $messages[$k]->user->info->info = null;
                }
                if(!empty($item->config->instagram) && $item->user->config->instagram->alias != 'zaregistrirovannym' && $item->user->config->instagram->alias != 'vsem'){
                    $messages[$k]->user->info->instagram = null;
                }
                if(!empty($item->config->odnoklassniki) && $item->user->config->odnoklassniki->alias != 'zaregistrirovannym' && $item->user->config->odnoklassniki->alias != 'vsem'){
                    $messages[$k]->user->info->odnoklassniki = null;
                }
                if(!empty($item->config->residence) && $item->user->config->residence->alias != 'zaregistrirovannym' && $item->user->config->residence->alias != 'vsem'){
                    $messages[$k]->user->info->residence = null;
                }
                if(!empty($item->config->sex) && $item->user->config->sex->alias != 'zaregistrirovannym' && $item->user->config->sex->alias != 'vsem'){
                    $messages[$k]->user->info->sex = null;
                }
                if(!empty($item->config->skype) && $item->user->config->skype->alias != 'zaregistrirovannym' && $item->user->config->skype->alias != 'vsem'){
                    $messages[$k]->user->info->skype = null;
                }
                if(!empty($item->config->telegram) && $item->user->config->telegram->alias != 'zaregistrirovannym' && $item->user->config->telegram->alias != 'vsem'){
                    $messages[$k]->user->info->telegram = null;
                }
                if(!empty($item->config->twitter) && $item->user->config->twitter->alias != 'zaregistrirovannym' && $item->user->config->twitter->alias != 'vsem'){
                    $messages[$k]->user->info->twitter = null;
                }
                if(!empty($item->config->vk) && $item->user->config->vk->alias != 'zaregistrirovannym' && $item->user->config->vk->alias != 'vsem'){
                    $messages[$k]->user->info->vk = null;
                }
                if(!empty($item->config->whatsapp) && $item->user->config->whatsapp->alias != 'zaregistrirovannym' && $item->user->config->whatsapp->alias != 'vsem'){
                    $messages[$k]->user->info->whatsapp = null;
                }
                if(!empty($item->config->youtube) && $item->user->config->youtube->alias != 'zaregistrirovannym' && $item->user->config->youtube->alias != 'vsem'){
                    $messages[$k]->user->info->youtube = null;
                }
                if(!empty($item->config->viber) && $item->user->config->viber->alias != 'zaregistrirovannym' && $item->user->config->viber->alias != 'vsem'){
                    $messages[$k]->user->info->viber = null;
                }
            }
        }elseif(false){ // для друзей
            // TODO add info to fends
        }else{ // для всех
            foreach ($messages as $k=>$item){
                if($item->user->config->email->alias != 'vsem'){
                    $messages[$k]->user->infos->email = null;
                }
                if($item->user->config->facebook->alias != 'vsem'){
                    $messages[$k]->user->infos->facebook = null;
                }
                if($item->user->config->info->alias != 'vsem'){
                    $messages[$k]->user->infos->info = null;
                }
                if($item->user->config->instagram->alias != 'vsem'){
                    $messages[$k]->user->infos->instagram = null;
                }
                if($item->user->config->odnoklassniki->alias != 'vsem'){
                    $messages[$k]->user->infos->odnoklassniki = null;
                }
                if($item->user->config->residence->alias != 'vsem'){
                    $messages[$k]->user->infos->residence = null;
                }
                if($item->user->config->odnoklassniki->alias != 'vsem'){
                    $messages[$k]->user->infos->sex = null;
                }
                if($item->user->config->skype->alias != 'vsem'){
                    $messages[$k]->user->infos->skype = null;
                }
                if($item->user->config->telegram->alias != 'vsem'){
                    $messages[$k]->user->infos->telegram = null;
                }
                if($item->user->config->twitter->alias != 'vsem'){
                    $messages[$k]->user->infos->twitter = null;
                }
                if($item->user->config->telegram->alias != 'vsem'){
                    $messages[$k]->user->infos->vk = null;
                }
                if($item->user->config->whatsapp->alias != 'vsem'){
                    $messages[$k]->user->infos->whatsapp = null;
                }
                if($item->user->config->youtube->alias != 'vsem'){
                    $messages[$k]->user->infos->youtube = null;
                }
                if($item->user->config->viber->alias != 'vsem'){
                    $messages[$k]->user->infos->viber = null;
                }
            }
        }

        return $messages;
    }

    // Формирует url на соц сети
    private function formatSocialLinks($messages){
        foreach ($messages as $k=>$item){
            $messages[$k]->user->infos->setAttribute('facebook_link', 'https://fb.com/' . $item->user->infos->facebook);
            $messages[$k]->user->infos->setAttribute('odnoklassniki_link', 'https://fb.com/' . $item->user->infos->odnoklassniki);
            $messages[$k]->user->infos->setAttribute('twitter_link', 'https://fb.com/' . $item->user->infos->twitter);
            $messages[$k]->user->infos->setAttribute('vk_link', 'https://fb.com/' . $item->user->infos->vk);
            $messages[$k]->user->infos->setAttribute('youtube_link', 'https://fb.com/' . $item->user->infos->youtube);
            $messages[$k]->user->infos->setAttribute('instagram_link', 'https://fb.com/' . $item->user->infos->instagram);
        }

        return $messages;
    }
}
