<?php

namespace App\Http\Controllers\JsonData;

use App\Http\Controllers\BaseController;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class IndexController
 * @ WordRepository $wordRepository
 * @package App\Http\Controllers\Api
 */
class IndexController extends BaseController
{
    private $wordRepository;

    public function __construct()
    {
        parent::__construct();
        //$this->middleware('auth:api');
        $this->wordRepository = app(WordRepository::class);
    }


    public function index(Request $request){


        $words = $this->wordRepository->getRandomWords(10);
        return response()->json([
            'words' => $words,
            'user' => \Auth::user() ? \Auth::user()->toArray() : [],
            'auth' => \Auth::user() ? true : false,
        ]);
    }
}
