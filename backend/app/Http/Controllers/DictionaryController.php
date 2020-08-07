<?php

namespace App\Http\Controllers;

use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class DictionaryController extends BaseController
{
    /**
     * @var WordRepository
     */
    private $wordRepository;

    public function __construct()
    {
        $this->wordRepository = app(WordRepository::class);
        parent::__construct();
    }

    public function index(Request $request){

        if(!empty($request->pos)){
            $pos = $this->wordRepository->getPosById((int)$request->pos);
        }

        $title = 'Французско-русский словарь' . ((!empty($pos)) ? ' ' . $pos->title : '');
        if(!empty($request->lang) && $request->lang == 'ru'){
            $title = 'Русско-французский словарь' . ((!empty($pos)) ? ' ' . $pos->title : '');
        }
        $meta = [
            'title' => $title,
            'description' => $title,
            'keywords' => $title,
        ];

        return view('index', compact('meta'));
    }

    public function show($id)
    {
        //
        $word = $this->wordRepository->getItem((int)$id);

        $title = 'Перевод слова ' . $word->word;
        $meta = [
            'title' => $title,
            'description' => $title,
            'keywords' => $title,
        ];

        return view('index', compact('meta'));
    }
}
