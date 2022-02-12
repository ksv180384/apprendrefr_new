<?php

namespace App\Services;


use App\Models\Proverb;

class ProverbService {

    /**
     * Получает заданное количество случайных пословиц
     * @param int $count
     * @return mixed
     */
    public function proverbRandom($count = 1){
        $proverbs = Proverb::select(['id', 'text', 'translation'])
            ->inRandomOrder()
            ->limit($count)
            ->get();

        return $proverbs;
    }

    /**
     * Получает случайную пословицу
     * @return Proverb
     */
    public function proverbRandomOne(){
        $proverb = Proverb::select(['id', 'text', 'translation'])
            ->inRandomOrder()
            ->first();

        return $proverb;
    }
}
