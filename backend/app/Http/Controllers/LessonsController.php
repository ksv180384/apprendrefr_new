<?php

namespace App\Http\Controllers;

use App\Repositories\LessonRepository;
use Illuminate\Http\Request;

class LessonsController extends BaseController
{
    /**
     * @var LessonRepository
     */
    private $lessonRepository;


    public function __construct()
    {
        parent::__construct();
        $this->lessonRepository = app(LessonRepository::class);
    }

    public function index(){

        $meta = [
            'title' => 'Уроки французского языка',
            'description' => 'Уроки французского языка. Каждый урок французского языка для начинающих представлен в виде темы для общения.',
            'keywords' => 'Уроки французского языка',
        ];

        return view('index', compact('meta'));
    }

    public function show($id){

        $lesson = $this->lessonRepository->getById($id);

        $meta = [
            'title' => 'Тема урока' . $lesson->title . ' | Французский язык',
            'description' => $lesson->description,
            'keywords' => 'Тема урока' . $lesson->title . ' | Французский язык',
        ];

        return view('index', compact('meta'));
    }
}
