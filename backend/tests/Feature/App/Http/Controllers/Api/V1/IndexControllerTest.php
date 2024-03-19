<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\V1\IndexController;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IndexControllerTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    /**
     * @test
     */
    public function index_page(): void
    {
        $response = $this->get(action([IndexController::class, 'index']));

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'description',
            'keywords',
            'title',
            'proverb' => [
                'id',
                'text',
                'translation',
            ],
            'statistic' => [
                'count_all',
                'count_guests',
                'count_messages',
                'count_users',
                'count_users_register',
                'online_users',
            ],
            'user',
            'words_list' => [
                '*' => [
                    'id',
                    'pronunciation',
                    'word',
                    'translation',
                    'transcription',
                    'example',
                ]
            ],
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'forum_id',
                    'forum',
                    'user_id',
                    'user',
                    'last_message_id',
                    'last_messages',
                    'messages_count',
                    'count_views',
                    'status',
                    'updated_at',
                    'created_at'
                ]
            ],
        ]);
    }
}
