<?php
namespace App\Services;

use App\Models\Proverb;

class SearchService {

    public function search(string $text, string $type)
    {
        $songService = new SongService();
        $wordService = new WordService();

        $result = [];
        if($type === 'word'){
            $result = $wordService->searchFrNoLimit($text);
        }
        elseif ($type === 'song'){
            $result = $songService->search($text);
        }

        return $result;
    }
}
