<?php

namespace App\Http\Controllers\Api\Forum;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ForumMessageCreateRequest;
use App\Models\Forum\Forum;
use App\Models\Forum\Message;
use App\Models\Forum\MessageStatus;
use App\Models\Forum\Topic;
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
        $messages = $this->forumMessageRepository->getByTopicId((int)$topic_id);
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

    public function getMessagesPaginate($forum_id, $topic_id){
        $topic = $this->forumTopicRepository->getById((int)$topic_id);
        $messages = $this->forumMessageRepository->getByTopicId((int)$topic_id);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

        if(count($messages) == 0){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
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
        $status = MessageStatus::select(['id', 'title', 'alias'])->where('alias', '=', 'visible_everyone')->first();

        $message_id = Message::create([
            'message' => $request->message,
            'topic_id' => $request->topic,
            'user_id' => \Auth::id(),
            'status' => $status->id,
        ])->id;

        $topic = Topic::select(['id', 'forum_id'])->where('id', '=', $request->topic)->first();
        $topic->update(['last_message_id' => $message_id]);
        Forum::where('id', '=', $topic->forum_id)->first()->update(['last_message_id' => $message_id]);

        $topic = $this->forumTopicRepository->getById($request->topic);
        $messages = $this->forumMessageRepository->getByTopicIdLastPage($request->topic);
        $messages = $this->formatSocialLinks($this->filterInfo($messages));

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
