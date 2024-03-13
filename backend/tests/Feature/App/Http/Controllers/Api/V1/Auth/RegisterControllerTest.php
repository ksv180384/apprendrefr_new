<?php

namespace Tests\Feature\App\Http\Controllers\Api\V1\Auth;

use App\Http\Requests\Api\Auth\RegistrationFormApiRequest;
use App\Models\User;
use App\Models\User\Sex;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

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
    public function it_register_user(): void
    {
        $sex = Sex::inRandomOrder()->first();

        $postUserData = [
            'login' => 'Login Test',
            'email' => 'login-test@mail.ru',
            'password' => '123456',
            'password_confirmation' => '123456',
            'sex' => $sex->id,
        ];

        $response = $this->withServerVariables(['HTTP_HOST' => 'apprendrefr.local',])->post('api/v1/auth/register', $postUserData);

        $response->assertStatus(Response::HTTP_CREATED);

        $user = User::where('email', $postUserData['email'])->first();

        $this->assertDatabaseHas('users', ['email' => $postUserData['email']]);

        $this->assertDatabaseHas('user_configs', ['user_id' => $user->id]);
        $this->assertDatabaseHas('user_infos', ['user_id' => $user->id]);
    }
}
