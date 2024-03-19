<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1\Song;

use App\Http\Controllers\Api\V1\Song\SongController;
use App\Models\Player\PlayerSongs;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SongControllerTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     */
    public function song_search_by_artist_and_title_only_title(): void
    {

        $song = PlayerSongs::inRandomOrder()->first();

        $requestData = [
            'artist' => '',
            'title' => $song->title,
            'file_name' => '',
        ];

        $response = $this->get(action([SongController::class, 'searchByArtistAndTitle']), $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'song' => ['title', 'artist_name', 'text_fr', 'text_ru', 'text_transcription']
        ]);
    }

    /**
     * @test
     */
    public function song_search_by_artist_and_title_only_artist_name(): void
    {

        $song = PlayerSongs::inRandomOrder()->first();

        $requestData = [
            'artist' => $song->artist_name,
            'title' => '',
            'file_name' => '',
        ];

        $response = $this->get(action([SongController::class, 'searchByArtistAndTitle']), $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'song' => ['title', 'artist_name', 'text_fr', 'text_ru', 'text_transcription']
        ]);
    }

    /**
     * @test
     */
    public function song_search_by_artist_and_title_only_file_name(): void
    {

        $song = PlayerSongs::inRandomOrder()->first();

        $requestData = [
            'artist' => '',
            'title' => '',
            'file_name' => $song->artist_name . ' - ' . $song->title,
        ];

        $response = $this->get(action([SongController::class, 'searchByArtistAndTitle']), $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'song' => ['title', 'artist_name', 'text_fr', 'text_ru', 'text_transcription']
        ]);
    }

    /**
     * @test
     */
    public function song_search_by_artist_and_title_all(): void
    {

        $song = PlayerSongs::inRandomOrder()->first();

        $requestData = [
            'artist' => $song->artist_name,
            'title' => $song->title,
            'file_name' => $song->artist_name . ' - ' . $song->title,
        ];

        $response = $this->get(action([SongController::class, 'searchByArtistAndTitle']), $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'song' => ['title', 'artist_name', 'text_fr', 'text_ru', 'text_transcription']
        ]);
    }

    /**
     * @test
     */
    public function song_show(): void
    {

        $song = PlayerSongs::inRandomOrder()->first();

        $response = $this->get(action([SongController::class, 'show'], ['id' => $song->id]));

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'song' => ['title', 'artist_name', 'text_fr', 'text_ru', 'text_transcription']
        ]);
    }
}
