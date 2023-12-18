<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Services\SearchService;
use Illuminate\Http\Request;

class SearchController extends BaseController
{

    public function searchAll(Request $request, SearchService $searchService){

        $text = $request->query('text', '');
        $type = $request->query('type', '');

        $result = $searchService->search($text, $type);

        return response()->json(['search' => $result]);
    }
}
