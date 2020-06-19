<?php

namespace App\Http\Controllers\Api\Song;

use App\Http\Controllers\Controller;
use App\Repositories\SongRepository;
use Illuminate\Http\Request;

class SongController extends Controller
{

    /**
     * @var SongRepository
     */
    private $songRepository;

    public function __construct(){
        $this->songRepository = app(SongRepository::class);
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
     * Получаем список всех треков
     */
    public function list(){
        $songsList = $this->songRepository->getSongsList();

        return response()->json($songsList);
    }

    /**
     * Получаем данные трека по идентификатору
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function song(Request $request){
        $id = (int)$request->id;
        $song = $this->songRepository->getById($id);

        return response()->json($song);
    }

    public function searchByArtistAndTitle(Request $request){
        $artist = $request->artist;
        $title = $request->title;
        $song = $this->songRepository->searchByArtistAndTitle($artist, $title);

        return response()->json($song);
    }
}
