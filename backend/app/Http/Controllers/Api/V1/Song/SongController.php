<?php

namespace App\Http\Controllers\Api\V1\Song;

use App\Http\Controllers\BaseController;
use App\Http\Resources\SongText\SearchSongResource;
use App\Models\Player\PlayerSearchSong;
use App\Services\SongService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SongController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param Request $request
     * @param SongService $songService
     * @return JsonResponse
     */
    public function searchByArtistAndTitle(Request $request, SongService $songService): JsonResponse
    {
        $artist = $request->query('artist', '');
        $title = $this->removeSymbols($request->query('title', ''));
        $fileName = $request->query('file_name', '');

        $song = $songService->searchByArtistAndTitle($artist, $title);

        if(empty($song)){
            PlayerSearchSong::create([
                'artist' => $artist,
                'title' => $title,
                'title_file' => $fileName,
            ]);
        }

        return response()->json(
            $song ? SearchSongResource::make($song) : null
        );
    }

    private function removeSymbols(string $text): string
    {
        return trim(preg_replace('/[^\p{L}\p{N}\s\']/u', '', $text));
    }
}
