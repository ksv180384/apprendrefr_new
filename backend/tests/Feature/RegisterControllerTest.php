<?php

namespace Tests\Feature;

use App\Http\Controllers\Api\V1\Auth\Registred;
use App\Http\Requests\Api\Auth\RegistrationFormApiRequest;
use App\Models\User;
use App\Models\User\Sex;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
{

    use RefreshDatabase;

    protected array $request;

    protected function setUp(): void
    {
        parent::setUp();

        $sex = Sex::first();
        $confirmToken = User::generateConfirmedToken();
        $rang = User\Rang::select(['id'])->where('alias', '=', 'polzovatel')->first();

        $this->request = RegistrationFormApiRequest::factory()->create([
            'login' => 'Test',
            'email' => 'test@mail.ru',
            'password' => bcrypt(md5('password')),
            'sex' => $sex->id,
            'rang' => $rang->id,
            'confirm_token' => $confirmToken,
        ]);
    }

    private function request(): TestResponse
    {
        return $this->post(
            action([RegisterController::class, 'register']),
            $this->request
        );
    }

    private function findUser()
    {
        return User::query()->where('email', $this->request['email'])->first();
    }

    public function it_page_success()
    {
        $this->get(action([RegisterController::class, 'register']))
            ->assertOk()
            ->assertSee('Регистрация');
    }

    public function it_validation_success(): void
    {
        $this->request()->assertValid();
    }

    public function it_should_fail_validation_on_password_confirm(): void
    {
        $this->request['password'] = '123456';
        $this->request['password_confirmation'] = '1234567';

        $this->request()->assertInvalid(['password']);
    }

    public function it_user_created_success(): void
    {
        $this->assertDatabaseMissing('users', [
            'email' => $this->request['email']
        ]);

        $this->request();

        $this->assertDatabaseHas('users', [
            'email' => $this->request['email']
        ]);
    }

    public function it_should_fail_validation_on_unique_email(): void
    {
        UserFactory::new()->create([
            'email' => $this->request['email']
        ]);

        $this->assertDatabaseHas('users', [
            'email' => $this->request['email']
        ]);

        $this->request()->assertInvalid(['email']);
    }

    /*
    public function it_registred_event_and_listeners_dispatched(): void
    {
        \Event::fake();

        $this->request();

        \Event::assertDispatched(Registred::class,);
        \Event::assertListening(
            Registred::class,
            ConfirmEmail::class
        );
    }
    */
//    public function it_notification_sent(): void
//    {
//        $this->request();
//    }
}
