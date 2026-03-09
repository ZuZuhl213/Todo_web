<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }}</title>

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/js/app.js'])
    @endif
</head>
<body>
    <h1>{{ config('app.name', 'Laravel') }}</h1>
    <p>Backend API is running.</p>
    <p>
        <a href="https://laravel.com/docs" target="_blank" rel="noreferrer">Laravel Docs</a>
    </p>
</body>
</html>
