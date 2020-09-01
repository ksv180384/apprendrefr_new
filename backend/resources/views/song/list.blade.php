@extends('layouts.app')

@section('content')
    <h1>Тексты, транскрипции и переводы французских песен</h1>
    <ul>
        @foreach($artists as $artist)
            <li><strong>{{ $artist->name }}</strong></li>
            <ul>
                @foreach($songs as $song)
                    @if($song->artist_id == $artist->id)
                        <li><a href="/lyrics/item/{{ $song->id }}">{{ $song->title }}</a></li>
                    @endif
                @endforeach
            </ul>
        @endforeach
    </ul>
@endsection