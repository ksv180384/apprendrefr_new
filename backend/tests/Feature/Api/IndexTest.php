<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IndexTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ])->get('/api/index');

        $response->assertStatus(200)
            ->assertJson([
                'title' => '*',
                'description' => '*',
                'keywords',
                'proverb' => [
                    'id',
                    'text',
                    'translation',
                ],
                'data' => '*',
                'words_list' => '*',
                'statistic' => [
                    'online_users' => '*',
                    'count_users',
                    'count_guests',
                    'count_users_register',
                    'count_all',
                    'count_users',
                    'count_messages',
                ],
                'footer' => '*',
                'user' => '*',
                'auth' => '*',
            ]);
    }
}
