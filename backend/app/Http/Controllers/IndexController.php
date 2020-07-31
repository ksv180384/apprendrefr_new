<?php

namespace App\Http\Controllers;


use App\Models\Forum\Topic;
use App\Repositories\ForumTopicRepository;

class IndexController extends BaseController
{
    private $forumTopicRepository;
    public function __construct(){
        $this->forumTopicRepository = app(ForumTopicRepository::class);
    }
    //
    public function index(){

        $meta = [
            'title' => 'Французский язык - изучение, форум',
            'description' => 'Сайт по обмену знаниями французского языка. Французский язык - изучение, форум',
            'keywords' => 'apprendrefr,аппрондрефр,Французкий,francais,fr,french,форум французского языка,France,французский для начинающих',
        ];

        //dd(Topic::find(1)->user->login);
        //$topics = $this->forumTopicRepository->getTopicByForumId(3);
        $t = Topic::select()->where('id', '>', 0)->with(['user'])->get();
        foreach ($t as $el){
            $el->user->id;
        }


        return view('index', compact('meta'));
    }
}
