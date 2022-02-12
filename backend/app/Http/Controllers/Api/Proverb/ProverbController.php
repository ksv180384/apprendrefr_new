<?php

namespace App\Http\Controllers\Api\Proverb;

use App\Http\Controllers\Controller;
use App\Services\ProverbService;

class ProverbController extends Controller
{

    /**
     * @var ProverbService
     */
    private $proverbService;

    public function __construct(
        ProverbService $proverbService
    )
    {
        $this->proverbService = $proverbService;
    }

    public function randomProverb(){
        $proverb = $this->proverbService->proverbRandomOne();

        return response()->json($proverb);
    }
}
