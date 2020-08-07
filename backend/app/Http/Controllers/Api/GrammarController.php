<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grammar;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ForumTopicRepository;
use App\Repositories\ProverbRepository;
use App\Repositories\StatisticRepository;
use App\Repositories\UserRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class GrammarController extends BaseController
{
    /**
     * @var WordRepository
     */
    private $wordRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ProverbRepository
     */
    private $proverbRepository;

    /**
     * @var ForumMessageRepository
     */
    private $forumMessageRepository;

    /**
     * @var StatisticRepository
     */
    private $statisticRepository;

    /**
     * @var ForumTopicRepository
     */
    private $forumTopicRepository;

    public function __construct()
    {
        parent::__construct();
        //$this->middleware('auth:api');
        $this->wordRepository = app(WordRepository::class);
        $this->proverbRepository = app(ProverbRepository::class);
        $this->userRepository = app(UserRepository::class);
        $this->statisticRepository = app(StatisticRepository::class);
        $this->forumMessageRepository = app(ForumMessageRepository::class);
        $this->forumTopicRepository = app(ForumTopicRepository::class);
    }

    public function index(){
        $grammars_list = Grammar::select(['id', 'title'])->get();

        return response()->json([
            'title' => 'Грамматика французского языка',
            'description' => 'Грамматика французского языка',
            'keywords' => 'Грамматика французского языка',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'data' => [
                'grammars_list' => $grammars_list,
                'grammar_content' => '',
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
    }

    public function show($id){
        $grammar_content = Grammar::select(['id', 'title', 'description', 'content'])->where('id', '=', (int)$id)->first();
        if(empty($grammar_content)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        return response()->json([
            'title' => $grammar_content->title . ' - грамматика французского языка',
            'description' => $grammar_content->description,
            'keywords' => $grammar_content->title . ' - грамматика французского языка',
            'data' => [
                'grammar_content' => $grammar_content,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
    }

    public function showPage($id){
        $grammars_list = Grammar::select(['id', 'title'])->get();
        $grammar_content = Grammar::select(['id', 'title', 'description', 'content'])->where('id', '=', (int)$id)->first();
        if(empty($grammar_content)){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }


        return response()->json([
            'title' => $grammar_content->title . ' - грамматика французского языка',
            'description' => $grammar_content->title . ' - грамматика французского языка',
            'keywords' => $grammar_content->title . ' - грамматика французского языка',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'data' => [
                'grammars_list' => $grammars_list,
                'grammar_content' => $grammar_content,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
    }
}
