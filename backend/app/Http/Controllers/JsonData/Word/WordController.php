<?php

namespace App\Http\Controllers\JsonData\Word;

use App\Http\Controllers\Api\BaseController;
use App\Models\Words\Word;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

/**
 * Class WordController
 * @package App\Http\Controllers\Api\Word
 */
class WordController extends BaseController
{
    /**
     * @var WordRepository
     */
    private $wordRepository;

    public function __construct()
    {
        parent::__construct();

        $this->wordRepository = app(WordRepository::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return 'Word';
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function wordsRandom(){

        $wordsList = $this->wordRepository->getRandomWords(10);

        return response()->json(["success" => "Y", "words" => $wordsList]);
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
}
