<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class IndexControllerTest extends TestCase
{
    /**
     * @test
     */
    public function it_index_page(): void
    {
        $response = $this->get('api/v1/page/');

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
