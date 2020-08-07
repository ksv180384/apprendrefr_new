<?php

namespace App\Http\Controllers;

use App\Models\Grammar;

class GrammarController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(){

        $meta = [
            'title' => 'Грамматика французского языка',
            'description' => 'Грамматика французского языка',
            'keywords' => 'Грамматика французского языка',
        ];

        return view('index', compact('meta'));
    }

    public function show($id){

        $grammar_content = Grammar::select(['id', 'title', 'description', 'content'])->where('id', '=', (int)$id)->first();

        $meta = [
            'title' => $grammar_content->title . ' - грамматика французского языка',
            'description' => $grammar_content->description,
            'keywords' => $grammar_content->title . ' - грамматика французского языка',

        ];

        return view('index', compact('meta'));
    }
}
