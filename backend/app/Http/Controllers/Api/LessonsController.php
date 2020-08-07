<?php

namespace App\Http\Controllers\Api;

use App\Repositories\LessonRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class LessonsController extends BaseController
{

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var LessonRepository
     */
    private $lessonRepository;


    public function __construct()
    {
        parent::__construct();
        $this->userRepository = app(UserRepository::class);
        $this->lessonRepository = app(LessonRepository::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $lessons = $this->lessonRepository->getTitleList()->toArray();

        return response()->json([
            'title' => 'Уроки французского языка',
            'description' => 'Уроки французского языка. Каждый урок французского языка для начинающих представлен в виде темы для общения.',
            'keywords' => 'Уроки французского языка',
            'footer' => [
                $this->yar_life,
                'E-mail: ' . self::EMAIL,
            ],
            'data' => [
                'list' => $lessons,
                'content' => '',
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
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
        if($id == 0){
            return response()->json([
                'title' => 'Уроки французского языка',
                'description' => 'Уроки французского языка',
                'keywords' => 'Уроки французского языка',
                'data' => [
                    'content' => '',
                ],
                'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
                'auth' => \Auth::check(),
            ]);
        }
        $lesson = $this->lessonRepository->getById((int)$id)->toArray();
        if(empty($lesson)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $lesson['content'] = preg_replace(
            '/<img .*? src="([^"]*)" .*?>/',
            '<span class="lesson-play-btn"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></span>',
            $lesson['content']
        );


        return response()->json([
            'title' => 'Тема урока' . $lesson['title'] . ' | Французский язык',
            'description' => $lesson['description'],
            'keywords' => 'Тема урока' . $lesson['title'] . ' | Французский язык',
            'data' => [
                'content' => $lesson,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
    }


    public function showPage($id){
        $lessons_list = $this->lessonRepository->getTitleList()->toArray();
        $lesson = $this->lessonRepository->getById((int)$id)->toArray();
        if(empty($lesson)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $lesson['content'] = preg_replace(
            '/<img .*? src="([^"]*)" .*?>/',
            '<span class="lesson-play-btn"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></span>',
            $lesson['content']
        );

        return response()->json([
            'title' => 'Тема урока' . $lesson['title'] . ' | Французский язык',
            'description' => $lesson['description'],
            'keywords' => 'Тема урока' . $lesson['title'] . ' | Французский язык',
            'footer' => [
                $this->yar_life,
                'E-mail: ' . self::EMAIL,
            ],
            'data' => [
                'content' => $lesson,
                'list' => $lessons_list,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
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
