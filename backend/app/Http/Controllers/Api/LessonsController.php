<?php

namespace App\Http\Controllers\Api;

use App\Services\LessonService;
use App\Services\UserService;

class LessonsController extends BaseController
{

    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var LessonService
     */
    private $lessonService;


    public function __construct(
        UserService $userService,
        LessonService $lessonService
    )
    {
        parent::__construct();
        $this->userService = $userService;
        $this->lessonService = $lessonService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
        $lessons = $this->lessonService->getTitleList()->toArray();

        return response()->json([
            'title' => 'Уроки французского языка',
            'description' => 'Уроки французского языка. Каждый урок французского языка для начинающих представлен в виде темы для общения.',
            'keywords' => 'Уроки французского языка',
            'data' => [
                'list' => $lessons,
                'content' => '',
            ],
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;
        //
        if($id == 0){
            return response()->json([
                'title' => 'Уроки французского языка',
                'description' => 'Уроки французского языка',
                'keywords' => 'Уроки французского языка',
                'data' => [
                    'content' => '',
                ],
                'user' => $user,
                'auth' => \Auth::check(),
            ]);
        }
        $lesson = $this->lessonService->getById($id);
        if(empty($lesson)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $lesson['content'] = preg_replace(
            '/<img .*? src="([^"]*)" .*?>/',
            '<span class="lesson-play-btn"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></span>',
            $lesson->content
        );


        return response()->json([
            'title' => 'Тема урока' . $lesson->title . ' | Французский язык',
            'description' => $lesson->description,
            'keywords' => 'Тема урока' . $lesson->title . ' | Французский язык',
            'data' => [
                'content' => $lesson,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }


    public function showPage($id){
        $lessons_list = $this->lessonService->getTitleList();
        $lesson = $this->lessonService->getById($id);
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        if(empty($lesson)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        $lesson['content'] = preg_replace(
            '/<img .*? src="([^"]*)" .*?>/',
            '<span class="lesson-play-btn"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></span>',
            $lesson->content
        );

        return response()->json([
            'title' => 'Тема урока' . $lesson->title . ' | Французский язык',
            'description' => $lesson->description,
            'keywords' => 'Тема урока' . $lesson->title . ' | Французский язык',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'data' => [
                'content' => $lesson,
                'list' => $lessons_list,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }
}
