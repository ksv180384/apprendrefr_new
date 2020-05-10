<?php

namespace App\Http\Controllers\Api;

use App\Repositories\ProverbRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class IndexController extends BaseController
{
    //
    private $wordRepository;
    private $proverbRepository;

    public function __construct()
    {
        parent::__construct();
        //$this->middleware('auth:api');
        $this->wordRepository = app(WordRepository::class);
        $this->proverbRepository = app(ProverbRepository::class);
    }


    public function index(Request $request){

        $words = $this->wordRepository->getRandomWords(10);
        $proverb = $this->proverbRepository->getRandomProverb(1);

        return response()->json([
            'words' => $words,
            'proverb' => $proverb[0],
            'user' => \Auth::user() ? \Auth::user()->toArray() : [],
            'auth' => \Auth::user() ? true : false,
        ]);
    }
}
