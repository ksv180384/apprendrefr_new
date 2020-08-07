<?php

namespace App\Http\Controllers\Api\Word;

use App\Http\Controllers\Api\BaseController;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ProverbRepository;
use App\Repositories\StatisticRepository;
use App\Repositories\UserRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class WordController extends BaseController
{
    /**
     * @var WordRepository
     */
    private $wordRepository;

    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ProverbRepository
     */
    private $proverbRepository;

    /**
     * @var ForumMessageRepository
     */
    private $forumMessageRepository;

    /**
     * @var StatisticRepository
     */
    private $statisticRepository;


    public function __construct()
    {
        $this->wordRepository = app(WordRepository::class);
        $this->proverbRepository = app(ProverbRepository::class);
        $this->userRepository = app(UserRepository::class);
        $this->statisticRepository = app(StatisticRepository::class);
        $this->forumMessageRepository = app(ForumMessageRepository::class);
        parent::__construct();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $pos = $request->pos ?: false;

        if(!empty($request->lang) && $request->lang == 'ru') {
            $words_page = $this->wordRepository->getWordsPaginateRu($pos);
        }else{
            $words_page = $this->wordRepository->getWordsPaginateFr($pos);
        }
        if(empty($words_page->toArray()['data'])){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }
        if(!empty($request->pos)){
            $pos = $this->wordRepository->getPosById((int)$request->pos);
        }
        $pos_list = $this->wordRepository->getPosAll();
        $proverb = $this->proverbRepository->getRandomProverb(1)[0];

        $words_list = $this->wordRepository->getRandomWords();
        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

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
                'words' => $words_page,
                'pos_list' => $pos_list,
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

    public function listPaginate(Request $request){
        $pos = $request->pos ?: false;

        if(!empty($request->lang) && $request->lang == 'ru') {
            $words_page = $this->wordRepository->getWordsPaginateRu($pos);
        }else{
            $words_page = $this->wordRepository->getWordsPaginateFr($pos);
        }
        /*
        if(empty($words_page)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }
        */
        if(!empty($request->pos)){
            $pos = $this->wordRepository->getPosById((int)$request->pos);
        }

        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

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
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
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
        $word = $this->wordRepository->getItem((int)$id);

        if(empty($word)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $words_list = $this->wordRepository->getRandomWords();
        $proverb = $this->proverbRepository->getRandomProverb(1)[0];

        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

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

    /**
     * Получает слово по идентификатору
     * @param $id - идентификатор слова
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItem($id){
        $word = $this->wordRepository->getItem((int)$id);

        return response()->json($word);
    }

    /**
     * Получает 10 случайных слов
     * @return \Illuminate\Http\JsonResponse
     */
    public function randomList(){
        $words = $this->wordRepository->getRandomWords(10);

        return response()->json($words->toArray());
    }

    public function testYourSelf(){
        $result = [];
        $wordsList = $this->wordRepository->getRandomWords(60)->toArray();

        $key = 0;
        for ($i = 0; count($wordsList) > $i; $i++){
            $result[$key]['answer_options'][] = $wordsList[$i];
            if($i%5 === 0 && $i != 0){
                $result[$key]['answer'] = $wordsList[$i];
                shuffle($result[$key]['answer_options']);
                $key++;
            }
        }

        //var_export($result);
        return response()->json($result);
    }

    public function search(Request $request){
        if(empty($request->search)){
            return response()->json([]);
        }
        if($request->lang === 'ru'){
            $search_result = $this->wordRepository->searchRu($request->search);
        }else{
            $search_result = $this->wordRepository->searchFr($request->search);
        }

        return response()->json($search_result);
    }

    public function searchPage(Request $request){
        if(empty($request->search)){
            return response()->json([]);
        }
        if($request->lang === 'ru'){
            $search_result = $this->wordRepository->searchRuPage($request->search);
        }else{
            $search_result = $this->wordRepository->searchFrPage($request->search);
        }

        $words_list = $this->wordRepository->getRandomWords();
        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

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
                'words' => $search_result,
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

        return response()->json($search_result);

    }
}
