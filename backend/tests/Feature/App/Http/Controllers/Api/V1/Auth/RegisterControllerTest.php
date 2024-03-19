<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\V1\Auth\RegisterController;
use App\Models\User\Gender;
use App\Models\User\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

//    private User $user;
//
//    protected function setUp(): void
//    {
//        parent::setUp();

//        $this->user = User::factory()->create();

//        dd($this->user);

//        $this->withServerVariables([
//            'HTTP_HOST' => 'apprendrefr.local',
//        ]);
//    }

    /**
     * @test
     * A basic feature test example.
     */
    public function register_user(): void
    {
        $gender = Gender::inRandomOrder()->first();

        $postUserData = [
            'login' => 'Login Test',
            'email' => 'login-test@mail.ru',
            'password' => '123456',
            'password_confirmation' => '123456',
            'gender_id' => $gender->id,
        ];

        $response = $this->post(action([RegisterController::class, 'register']), $postUserData);

        $response->assertStatus(Response::HTTP_CREATED);

        $user = User::where('email', $postUserData['email'])->first();

        $this->assertDatabaseHas('users', ['email' => $postUserData['email']]);

        $this->assertDatabaseHas('user_configs', ['user_id' => $user->id]);
        $this->assertDatabaseHas('user_infos', ['user_id' => $user->id]);

        $response->assertJsonStructure([
            'app_user_token',
            'message' => [
                'ru',
                'fr',
            ]
        ]);
    }
}
