<?php

namespace App\Http\Resources\Word;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WordsListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $result = [
            'id' => $this->id,
            'word' => $this->word,
            'translation' => $this->translation,
            'transcription' => $this->transcription,
        ];

        return $result;
    }
}
