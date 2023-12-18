<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="description" content="{{ $meta['description'] ?? 'Сайт по обмену знаниями французского языка' }}">
    <meta name="keywords" content="{{ $meta['keywords'] ?? 'Французский язык' }}">

    <title>{{ config('app.name', 'ApprendreFr') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/css/app.css'])
</head>
<body>
    <div id="app"></div>
    @vite(['resources/js/app.js'])
</body>
</html>
