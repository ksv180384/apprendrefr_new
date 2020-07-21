<?php

namespace App\Http\Controllers\Api\Song;

use App\Http\Controllers\Controller;
use App\Models\Player\PlayerSearchSong;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ProverbRepository;
use App\Repositories\SongRepository;
use App\Repositories\StatisticRepository;
use App\Repositories\UserRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class SongController extends Controller
{

    /**
     * @var SongRepository
     */
    private $songRepository;

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
     * @var StatisticRepository
     */
    private $statisticRepository;

    /**
     * @var ForumMessageRepository
     */
    private $forumMessageRepository;

    public function __construct(){
        $this->songRepository = app(SongRepository::class);
        $this->wordRepository = app(WordRepository::class);
        $this->proverbRepository = app(ProverbRepository::class);
        $this->userRepository = app(UserRepository::class);
        $this->statisticRepository = app(StatisticRepository::class);
        $this->forumMessageRepository = app(ForumMessageRepository::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $artists = $this->songRepository->getArtists()->toArray();
        $songsList = $this->songRepository->getSongsList()->toArray();
        $words_list = $this->wordRepository->getRandomWords();
        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

        $list = [];
        foreach ($artists as $key=>$artist){
            $list[$key] = $artist;
            foreach ($songsList as $k=>$song){
                if($artist['id'] === $song['artist_id']){
                    $list[$key]['songs'][] = $song;
                }

            }
        }

        return response()->json([
            'title' => 'Тексты, транскрипции и переводы французских песен',
            'description' => 'Тексты, транскрипции и переводы французских песен',
            'keywords' => 'Тексты, транскрипции и переводы французских песен',
            'footer' => [
                '2010 - ' . date('Y') . ' гг ApprendereFr.ru',
                'E-mail: admin@apprendrefr.ru'
            ],
            'data' => [
                'list' => $list,
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

    /**
     * Получаем список всех треков
     */
    public function list(){
        $songsList = $this->songRepository->getSongsList();

        return response()->json($songsList);
    }

    /**
     * Получаем данные трека по идентификатору
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function song(Request $request){
        $id = (int)$request->id;
        $song = $this->songRepository->getById($id);

        return response()->json($song);
    }

    public function searchByArtistAndTitle(Request $request){
        $artist = $request->artist;
        $title = $request->title;
        $file_name = $request->file_name;
        $song = $this->songRepository->searchByArtistAndTitle($artist, $title);
        if(empty($song)){
            PlayerSearchSong::create([
                'artist' => $artist,
                'title' => $title,
                'title_file' => $file_name,
            ]);
        }

        return response()->json($song);
    }

    public function search(Request $request){
        if(empty($request->search)){
            return response()->json([]);
        }
        $search = $request->search;
        $search = strip_tags(trim($search));
        $search = str_replace(['-', '_', ',', '.'], " ", $search);
        $search = preg_replace('/\s+/', ' ', $search);
        $search_result = $this->songRepository->search($search);

        return response()->json($search_result);
    }
}
