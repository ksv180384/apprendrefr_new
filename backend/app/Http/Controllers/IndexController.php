<?php

namespace App\Http\Controllers;


use App\Models\Forum\ForumTopic;
use App\Http\Repositories\ForumTopicRepository;
use App\Services\ForumMessageService;

class IndexController extends BaseController
{
    public function __construct(){
        parent::__construct();
    }
    //
    public function index(){

        $meta = [
            'title' => 'Французский язык - изучение, форум',
            'description' => 'Сайт по обмену знаниями французского языка. Французский язык - изучение, форум',
            'keywords' => 'apprendrefr,аппрондрефр,Французкий,francais,fr,french,форум французского языка,France,французский для начинающих',
        ];

        return view('index', compact('meta'));
    }
}
