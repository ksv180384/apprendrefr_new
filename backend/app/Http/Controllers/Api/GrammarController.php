<?php

namespace App\Http\Controllers\Api;

use App\Models\Grammar;
use Illuminate\Http\JsonResponse;

class GrammarController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return JsonResponse
     */
    public function index()
    {
        $grammars_list = Grammar::select(['id', 'title'])->get();

        return response()->json([
            'title' => 'Грамматика французского языка',
            'description' => 'Грамматика французского языка',
            'keywords' => 'Грамматика французского языка',
            'data' => [
                'grammars_list' => $grammars_list,
                'grammar_content' => '',
            ],
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id)
    {
        $grammar_content = Grammar::select(['id', 'title', 'description', 'content'])->findOrFail($id);

        return response()->json([
            'title' => $grammar_content->title . ' - грамматика французского языка',
            'description' => $grammar_content->description,
            'keywords' => $grammar_content->title . ' - грамматика французского языка',
            'data' => [
                'grammar_content' => $grammar_content,
            ],
        ]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function showPage(int $id): JsonResponse
    {
        $grammars_list = Grammar::select(['id', 'title'])->get();
        $grammar_content = Grammar::select(['id', 'title', 'description', 'content'])->findOrFail($id);

        return response()->json([
            'title' => $grammar_content->title . ' - грамматика французского языка',
            'description' => $grammar_content->title . ' - грамматика французского языка',
            'keywords' => $grammar_content->title . ' - грамматика французского языка',
            'data' => [
                'grammars_list' => $grammars_list,
                'grammar_content' => $grammar_content,
            ],
        ]);
    }
}
