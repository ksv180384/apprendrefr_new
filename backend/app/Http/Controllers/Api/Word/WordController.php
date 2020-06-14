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

    public function randomList(){
        $words = $this->wordRepository->getRandomWords(10);

        return response()->json($words->toArray());
    }

    public function testYourSelf(){
        $result = [];
        $wordsList = $this->wordRepository->getRandomWords(100)->toArray();

        //var_export($wordsList);
        $key = 0;
        for ($i = 0; count($wordsList) > $i; $i++){
            $result[$key]['answer_options'][] = $wordsList[$i];
            //var_export($i%9);
            if($i%9 === 0 && $i != 0){
                $result[$key]['answer'] = $wordsList[$i];
                $key++;
            }
        }

        //var_export($result);
        return response()->json($result);
    }
}
