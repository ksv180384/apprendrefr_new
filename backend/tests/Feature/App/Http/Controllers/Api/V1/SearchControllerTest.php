<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1;

use App\Models\Player\PlayerSongs;
use App\Models\Words\Word;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SearchControllerTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    /**
     * @test
     */
    public function header_search_word_fr(): void
    {
        Word::factory()->create([
            'word' => 'test 111',
            'translation' => 'тест',
        ]);

        $requestData = [
            'text' => 'test 111',
            'type' => 'word',
        ];

        $response = $this->post('api/v1/search', $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'search' => [
                '*' => ['id', 'translation', 'word', 'example']
            ]
        ]);
    }

    /**
     * @test
     */
    public function header_search_word_ru(): void
    {
        Word::factory()->create([
            'word' => 'test 111',
            'translation' => 'тест',
        ]);

        $requestData = [
            'text' => 'тест 111',
            'type' => 'word',
        ];

        $response = $this->post('api/v1/search', $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'search' => [
                '*' => ['id', 'translation', 'word', 'example']
            ]
        ]);
    }

    /**
     * @test
     */
    public function header_search_song(): void
    {
        PlayerSongs::factory()->create([
            'title' => 'test song 111',
        ]);

        $requestData = [
            'text' => 'test song 111',
            'type' => 'song',
        ];

        $response = $this->post('api/v1/search', $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'search' => [
                '*' => ['id', 'artist_id', 'artist_name', 'title']
            ]
        ]);
    }
}
