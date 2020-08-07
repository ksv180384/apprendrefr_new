@component('mail::message')
<h2>Регистрация на сайте {{ $_SERVER['HTTP_HOST']  }}</h2>
<br>
Здравствуйте {{ $user->login  }}.
<br>
Этот почтовый адрес был указан при регистрации на сайте <a href="http://{{ $_SERVER['HTTP_HOST']  }}">{{ $_SERVER['HTTP_HOST']  }}</a>
<br>
Для подтверждения регистрации перейдите по ссылке: <a href="http://{{ $_SERVER['HTTP_HOST']  }}/user/confirm-email/{{ $user->confirm_token }}">подтвердить регистрацию.</a>
<br><br>
Если это письмо пришло к Вам по ошибке, просто проигнорируйте его.

@component('mail::button', ['url' => 'http://' . $_SERVER["HTTP_HOST"] . '/user/confirm-email/' . $user->confirm_token])
    Подтвердить email
@endcomponent

Спасибо,<br>
{{ config('app.name') }}
@endcomponent
