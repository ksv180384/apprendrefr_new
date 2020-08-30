<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\SongRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class SearchController extends BaseController
{
    /**
     * @var SongRepository
     */
    private $songRepository;

    /**
     * @var WordRepository
     */
    private $wordRepository;
    //
    public function __construct()
    {
        parent::__construct();
        $this->songRepository = app(SongRepository::class);
        $this->wordRepository = app(WordRepository::class);
    }

    public function searchAll(Request $request){

        $result = [];
        $songs = $this->songRepository->searchText($request->text);
        $words = $this->wordRepository->searchFrNoLimit($request->text);
        foreach ($songs as $song){
            $result[] = view('search.search_song_item', compact('song'))->render();
        }
        foreach ($words as $word){
            $result[] = view('search.search_word_item', compact('word'))->render();
        }


        return response()->json(['search' => $result]);
    }
}
