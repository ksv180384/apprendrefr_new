@component('mail::message')
    Здравствуйте!
    <br><br>
    Для восстановления пароля перейдите по ссылке <a href="http://{{ $_SERVER['HTTP_HOST']  }}/user/change-password/{{ $token  }}">восстановления пароля</a>
    <br><br>
    <strong>Внимание!!!</strong> Ссылка активна 15 мин
    <br><br>
    Если это письмо пришло к Вам по ошибке, просто проигнорируйте его.
    <br><br>
    ApprendreFr.ru
@endcomponent