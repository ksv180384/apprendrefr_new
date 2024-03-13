@component('mail::message')
<h2>Регистрация на сайте {{ env('APP_URL')  }}</h2>
<br>
Здравствуйте {{ $user->login  }}.
<br>
Этот почтовый адрес был указан при регистрации на сайте <a href="{{ env('APP_URL')  }}">{{ env('APP_URL')  }}</a>
<br>
Для подтверждения регистрации перейдите по ссылке: <a href="{{ env('APP_URL')  }}/user/confirm-email/{{ $user->confirm_token }}">подтвердить регистрацию.</a>
<br><br>
Если это письмо пришло к Вам по ошибке, просто проигнорируйте его.

@component('mail::button', ['url' => env('APP_URL') . '/user/confirm-email/' . $user->confirm_token])
    Подтвердить email
@endcomponent

Спасибо,<br>
{{ config('app.name') }}
@endcomponent
