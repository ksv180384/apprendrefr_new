<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1\Auth;

use App\Models\User\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    /**
     * @test
     */
    public function login_user(): void
    {
        $user = User::factory()->create([
            'login' => 'login test',
            'email' => 'test-email@mail.ru',
        ]);

        $formData = [
            'email' => 'test-email@mail.ru',
            'password' => 'password',
            'remember' => true,
        ];

        $response = $this->post('api/v1/auth/login', $formData);

        $this->assertDatabaseHas('online', ['user_id' => $user->id]);

        $this->assertAuthenticatedAs($user);

        $response->assertJsonStructure([
            'app_user_token',
            'statistic',
            'user' => ['id', 'avatar', 'login', 'rang'],
            'message' => [
                'ru',
                'fr',
            ]
        ]);

        $response->assertStatus(Response::HTTP_OK);
    }
}
