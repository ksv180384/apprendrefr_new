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
        @yield('content')
    </div>
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
</body>
</html>
