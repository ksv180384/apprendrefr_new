<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use App\Services\SearchService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SearchController extends BaseController
{

    public function searchAll(Request $request, SearchService $searchService){

        $text = $request->input('text', '');
        $type = $request->input('type', '');
        $lang = Str::lower($request->input('lang', ''));

        $result = $searchService->search($text, $type, $lang);

        return response()->json(['search' => $result]);
    }
}
