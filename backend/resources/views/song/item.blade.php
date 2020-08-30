@extends('layouts.app')

@section('content')
    <div style="display: none;">
        <h1>{{ $song->artist_name }} - {{ $song->title }}</h1>
        <div>{{ $song->text_fr }}</div>
        <div>{{ $song->text_ru }}</div>
        <div>{{ $song->text_transcription }}</div>
    </div>
@endsection