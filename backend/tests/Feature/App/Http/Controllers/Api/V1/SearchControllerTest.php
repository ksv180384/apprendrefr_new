<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class SearchControllerTest extends TestCase
{
    /**
     * @test
     */
    public function header_search(): void
    {
        $requestData = [
            'text' => 'apprendre',
            'type' => 'word',
        ];

        $response = $this->get('api/v1/search', $requestData);

        $response->assertOk();

        $response->assertJsonStructure([
            'app_user_token',
            'search' => [
                '*' => ['id', 'translation', 'word', 'example']
            ]
        ]);
    }
}
