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
use App\Services\ForumMessageService;
use App\Services\ForumTopicService;
use App\Services\ProverbService;
use App\Services\StatisticService;
use App\Services\UserService;
use App\Services\WordService;
use Illuminate\Http\Request;

class GrammarController extends BaseController
{
    /**
     * @var WordService
     */
    private $wordService;
    /**
     * @var ProverbService
     */
    private $proverbService;
    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var StatisticService
     */
    private $statisticService;

    /**
     * @var ForumMessageService
     */
    private $forumMessageService;

    /**
     * @var ForumTopicService
     */
    private $forumTopicService;

    public function __construct(
        WordService $wordService,
        ProverbService $proverbService,
        UserService $userService,
        StatisticService $statisticService,
        ForumMessageService $forumMessageService,
        ForumTopicService $forumTopicService
    )
    {
        parent::__construct();
        $this->wordService = $wordService;
        $this->proverbService = $proverbService;
        $this->userService = $userService;
        $this->statisticService = $statisticService;
        $this->forumMessageService = $forumMessageService;
        $this->forumTopicService = $forumTopicService;
    }

    public function index(){
        $grammars_list = Grammar::select(['id', 'title'])->get();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

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
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }

    public function show($id){
        $grammar_content = Grammar::select(['id', 'title', 'description', 'content'])->findOrFail($id);
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        return response()->json([
            'title' => $grammar_content->title . ' - грамматика французского языка',
            'description' => $grammar_content->description,
            'keywords' => $grammar_content->title . ' - грамматика французского языка',
            'data' => [
                'grammar_content' => $grammar_content,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }

    public function showPage($id){
        $grammars_list = Grammar::select(['id', 'title'])->get();
        $grammar_content = Grammar::select(['id', 'title', 'description', 'content'])->findOrFail($id);
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

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
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }
}
