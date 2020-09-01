<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="{{ $meta['description'] ?? 'Сайт по обмену знаниями французского языка' }}">
    <meta name="keywords" content="{{ $meta['keywords'] ?? 'Французский язык' }}">
    <title>{{ $meta['title'] ?? 'Французский язык' }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="root">
        <div class="loader"></div>
        <menu>
            <li><a href="/">Главная</a></li>
            <li><a href="/grammar">Грамматика</a></li>
            <li><a href="/lyrics">Тексты песен</a></li>
            <li><a href="/lessons">Уроки</a></li>
            <li><a href="/forum">Форум</a></li>
            <li><a href="/dictionary">Словарь</a></li>
        </menu>
        @yield('content')
    </div>
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
</body>
</html>
