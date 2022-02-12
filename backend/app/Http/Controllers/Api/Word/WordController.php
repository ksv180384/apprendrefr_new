<?php

namespace App\Http\Controllers\Api\Word;

use App\Http\Controllers\Api\BaseController;
use App\Models\Words\Word;
use App\Services\ForumMessageService;
use App\Services\ProverbService;
use App\Services\StatisticService;
use App\Services\UserService;
use App\Services\WordService;
use Illuminate\Http\Request;

class WordController extends BaseController
{
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


    public function __construct(
        WordService $wordService,
        ProverbService $proverbService,
        UserService $userService,
        StatisticService $statisticService,
        ForumMessageService $forumMessageService
    )
    {
        parent::__construct();
        $this->wordService = $wordService;
        $this->proverbService = $proverbService;
        $this->userService = $userService;
        $this->statisticService = $statisticService;
        $this->forumMessageService = $forumMessageService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        //
        $pos = $request->pos ?: false;

        if(!empty($request->lang) && $request->lang == 'ru') {
            $wordsPage = $this->wordService->getWordsPaginateRu($pos);
        }else{
            $wordsPage = $this->wordService->getWordsPaginateFr($pos);
        }
        if(empty($wordsPage)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }
        if(!empty($request->pos)){
            $pos = $this->wordService->getPosById((int)$request->pos);
        }
        $posList = $this->wordService->getPosAll();
        $proverb = $this->proverbService->proverbRandomOne();

        $wordsList = $this->wordService->wordsRandom();
        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        $title = 'Французско-русский словарь' . ((!empty($pos)) ? ' ' . $pos->title : '');
        if(!empty($request->lang) && $request->lang == 'ru'){
            $title = 'Русско-французский словарь' . ((!empty($pos)) ? ' ' . $pos->title : '');
        }

        return response()->json([
            'title' => $title,
            'description' => $title,
            'keywords' => $title,
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => [
                'words' => $wordsPage,
                'pos_list' => $posList,
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

    public function listPaginate(Request $request){
        $pos = $request->pos ?: false;

        if(!empty($request->lang) && $request->lang == 'ru') {
            $words_page = $this->wordService->getWordsPaginateRu($pos);
        }else{
            $words_page = $this->wordService->getWordsPaginateFr($pos);
        }

        if(!empty($request->pos)){
            $pos = $this->wordService->getPosById((int)$request->pos);
        }

        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user() : [];

        $title = 'Французско-русский словарь' . ((!empty($pos)) ? ' ' . $pos->title : '');
        if(!empty($request->lang) && $request->lang == 'ru'){
            $title = 'Русско-французский словарь' . ((!empty($pos)) ? ' ' . $pos->title : '');
        }

        return response()->json([
            'title' => $title,
            'description' => $title,
            'keywords' => $title,
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'data' => [
                'words' => $words_page,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        //
        $word = Word::find($id);

        if(empty($word)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $wordsList = $this->wordService->wordsRandom();
        $proverb = $this->proverbService->proverbRandomOne();

        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        $title = 'Перевод слова ' . $word->word;

        return response()->json([
            'title' => $title,
            'description' => $title,
            'keywords' => $title,
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => [
                'word' => $word,
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
     * Получает слово по идентификатору
     * @param $id - идентификатор слова
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItem($id){
        $word = Word::findOrFail($id);

        return response()->json($word);
    }

    /**
     * Получает 10 случайных слов
     * @return \Illuminate\Http\JsonResponse
     */
    public function randomList(){
        $words = $this->wordService->wordsRandom(10);

        return response()->json($words);
    }

    /**
     * Выбараем случайные слова и ваиранты ответов
     * @return \Illuminate\Http\JsonResponse
     */
    public function testYourSelf(){
        $result = [];
        $wordsList = $this->wordService->wordsRandom(60)->toArray();

        $key = 0;
        for ($i = 0; count($wordsList) > $i; $i++){
            $result[$key]['answer_options'][] = $wordsList[$i];
            if($i%5 === 0 && $i != 0){
                $result[$key]['answer'] = $wordsList[$i];
                shuffle($result[$key]['answer_options']);
                $key++;
            }
        }

        return response()->json($result);
    }

    public function search(Request $request){
        if(empty($request->search)){
            return response()->json([]);
        }
        if($request->lang === 'ru'){
            $searchResult = $this->wordService->searchRu($request->search);
        }else{
            $searchResult = $this->wordService->searchFr($request->search);
        }

        return response()->json($searchResult);
    }

    /**
     * Страница поиска слов
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchPage(Request $request){
        if(empty($request->search)){
            return response()->json([]);
        }
        if($request->lang === 'ru'){
            $searchResult = $this->wordService->searchRuPage($request->search);
        }else{
            $searchResult = $this->wordService->searchFrPage($request->search);
        }

        $wordsList = $this->wordService->wordsRandom();
        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        $title = $request->search;

        return response()->json([
            'title' => $title,
            'description' => $title,
            'keywords' => $title,
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'data' => [
                'words' => $searchResult,
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
}
