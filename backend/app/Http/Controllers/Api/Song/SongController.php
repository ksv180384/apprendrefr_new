<?php

namespace App\Http\Controllers\Api\Song;

use App\Http\Controllers\Api\BaseController;
use App\Models\Player\PlayerSearchSong;
use App\Services\ForumMessageService;
use App\Services\ProverbService;
use App\Services\SongService;
use App\Services\StatisticService;
use App\Services\UserService;
use App\Services\WordService;
use Illuminate\Http\Request;

class SongController extends BaseController
{

    /**
     * @var SongService
     */
    private $songService;

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
        SongService $songService,
        WordService $wordService,
        ProverbService $proverbService,
        StatisticService $statisticService,
        UserService $userService,
        ForumMessageService $forumMessageService
    ){
        parent::__construct();
        $this->songService = $songService;
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
        $artists = $this->songService->getArtists()->toArray();
        $songsList = $this->songService->getSongsList()->toArray();
        $wordsList = $this->wordService->wordsRandom();
        $proverb = $this->proverbService->proverbRandomOne();

        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

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
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => [
                'list' => $list,
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $song = $this->songService->getById((int)$id)->toArray();
        if(empty($song)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }
        $user = \Auth::check() ? \Auth::user() : [];
        $song['text_fr'] = explode("\n", $this->songService->formatText($song['text_fr']));
        $song['text_ru'] = explode("\n", $this->songService->formatText($song['text_ru']));
        $song['text_transcription'] = explode("\n", $this->songService->formatText($song['text_transcription']));

        return response()->json([
            'title' => $song['artist_name'] . ' - ' . $song['title'] . ' (текст, транскрипция, перевод)',
            'description' => $song['artist_name'] . ' - ' . $song['title'] . ' (текст, транскрипция, перевод)',
            'keywords' => $song['artist_name'] . ' - ' . $song['title'] . ' (текст, транскрипция, перевод)',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'data' => [
                'song' => $song,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }

    /**
     * Получаем список всех треков
     * @return \Illuminate\Http\JsonResponse
     */
    public function list(){
        $songsList = $this->songService->getSongsList();

        return response()->json($songsList);
    }

    /**
     * Получаем данные трека по идентификатору
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function song(Request $request){
        $id = (int)$request->id;
        $song = $this->songService->getById($id);

        return response()->json($song);
    }

    public function searchByArtistAndTitle(Request $request){
        $artist = $request->artist;
        $title = $request->title;
        $file_name = $request->file_name;
        $song = $this->songService->searchByArtistAndTitle($artist, $title);
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

        $search_result = $this->songService->search($search);

        return response()->json($search_result);
    }
}
