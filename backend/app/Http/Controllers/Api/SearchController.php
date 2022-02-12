<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\SongRepository;
use App\Repositories\WordRepository;
use App\Services\SongService;
use App\Services\WordService;
use Illuminate\Http\Request;

class SearchController extends BaseController
{
    /**
     * @var SongService
     */
    private $songService;

    /**
     * @var WordService
     */
    private $wordService;
    //
    public function __construct(SongService $songService, WordService $wordService)
    {
        parent::__construct();
        $this->songService = $songService;
        $this->wordService = $wordService;
    }

    public function searchAll(Request $request){

        $result = [];
        $songs = $this->songService->searchText($request->text);
        $words = $this->wordService->searchFrNoLimit($request->text);
        foreach ($songs as $song){
            $result[] = view('search.search_song_item', compact('song'))->render();
        }
        foreach ($words as $word){
            $result[] = view('search.search_word_item', compact('word'))->render();
        }

        return response()->json(['search' => $result]);
    }
}
