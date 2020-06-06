<?php

namespace App\Http\Controllers\JsonData;

use App\Http\Controllers\BaseController;
//use App\Repositories\ProverbRepository;
use App\Repositories\UserRepository;
//use App\Repositories\WordRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class IndexController
 * @ WordRepository $wordRepository
 * @package App\Http\Controllers\Api
 */
class IndexController extends BaseController
{
    /**
     * @var WordRepository
     */
    private $wordRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ProverbRepository
     */
    private $proverbRepository;

    public function __construct()
    {
        parent::__construct();
        //$this->middleware('auth:api');
        //$this->wordRepository = app(WordRepository::class);
        //$this->proverbRepository = app(ProverbRepository::class);
        $this->userRepository = app(UserRepository::class);
    }


    public function index(Request $request){


        //$words = $this->wordRepository->getRandomWords(10);
        //$proverb = $this->proverbRepository->getRandomProverb(1);
        return response()->json([
            //'words' => $words,
            //'proverb' => $proverb[0],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::user() ? true : false,
        ]);
    }
}
