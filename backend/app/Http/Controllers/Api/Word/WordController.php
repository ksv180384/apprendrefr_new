<?php

namespace App\Http\Controllers\Api\Word;

use App\Http\Controllers\Controller;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * @var WordRepository
     */
    private $wordRepository;

    public function __construct()
    {
        $this->wordRepository = app(WordRepository::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Получает слово по идентификатору
     * @param $id - идентификатор слова
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItem($id){
        $word = $this->wordRepository->getItem((int)$id);

        return response()->json($word);
    }

    /**
     * Получает 10 случайных слов
     * @return \Illuminate\Http\JsonResponse
     */
    public function randomList(){
        $words = $this->wordRepository->getRandomWords(10);

        return response()->json($words->toArray());
    }

    public function testYourSelf(){
        $result = [];
        $wordsList = $this->wordRepository->getRandomWords(60)->toArray();

        $key = 0;
        for ($i = 0; count($wordsList) > $i; $i++){
            $result[$key]['answer_options'][] = $wordsList[$i];
            if($i%5 === 0 && $i != 0){
                $result[$key]['answer'] = $wordsList[$i];
                shuffle($result[$key]['answer_options']);
                $key++;
            }
        }

        //var_export($result);
        return response()->json($result);
    }

    public function search(Request $request){
        if(empty($request->search)){
            return response()->json([]);
        }
        if($request->lang === 'ru'){
            $search_result = $this->wordRepository->searchRu($request->search);
        }else{
            $search_result = $this->wordRepository->searchFr($request->search);
        }

        return response()->json($search_result);
    }
}
