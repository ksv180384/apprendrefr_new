<?php

namespace App\Http\Controllers\Api\V1\Word;

use App\Http\Controllers\Controller;
use App\Http\Resources\Word\WordsListResource;
use App\Services\WordService;
use Illuminate\Http\Request;

class WordController extends Controller
{
    public function randomList(WordService $wordService)
    {
        $words = $wordService->wordsRandom(['id', 'word', 'translation', 'transcription']);

        return response()->json([
            'words' => WordsListResource::collection($words),
        ]);
    }
}
