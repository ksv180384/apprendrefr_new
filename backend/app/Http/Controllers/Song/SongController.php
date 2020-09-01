<?php

namespace App\Http\Controllers\Song;

use App\Http\Controllers\BaseController;
use App\Repositories\SongRepository;
use Illuminate\Http\Request;

class SongController extends BaseController
{
    /**
     * @var SongRepository
     */
    private $songRepository;

    public function __construct(){
        $this->songRepository = app(SongRepository::class);
        parent::__construct();
    }

    public function index()
    {
        $artists = $this->songRepository->getArtists();
        $songs = $this->songRepository->getSongsList();

        $meta = [
            'title' => 'Тексты, транскрипции и переводы французских песен',
            'description' => 'Тексты, транскрипции и переводы французских песен',
            'keywords' => 'Тексты, транскрипции и переводы французских песен',
        ];

        return view('song.list', compact('meta', 'artists', 'songs'));
    }

    public function show($id)
    {
        $song = $this->songRepository->getById($id);


        $meta = [
            'title' => $song['artist_name'] . ' - ' . $song['title'] . ' (текст, транскрипция, перевод)',
            'description' => $song['artist_name'] . ' - ' . $song['title'] . ' (текст, транскрипция, перевод)',
            'keywords' => $song['artist_name'] . ' - ' . $song['title'] . ' (текст, транскрипция, перевод)',
        ];

        $song->text_fr = $this->songRepository->formatText($song->text_fr);
        $song->text_ru = $this->songRepository->formatText($song->text_ru);
        $song->text_transcription = $this->songRepository->formatText($song->text_transcription);

        return view('song.item', compact('meta', 'song'));
    }
}
