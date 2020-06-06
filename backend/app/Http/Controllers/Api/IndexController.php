<?php

namespace App\Http\Controllers\Api;

use App\Models\User\Sex;
use App\Models\User\UserConfigsView;
use App\Repositories\ProverbRepository;
use App\Repositories\UserRepository;
use App\Repositories\WordRepository;
use Illuminate\Http\Request;

class IndexController extends BaseController
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

    public function __construct()
    {
        parent::__construct();
        //$this->middleware('auth:api');
        $this->wordRepository = app(WordRepository::class);
        $this->proverbRepository = app(ProverbRepository::class);
        $this->userRepository = app(UserRepository::class);
    }


    public function index(Request $request){

        //$words = $this->wordRepository->getRandomWords(10);
        //$proverb = $this->proverbRepository->getRandomProverb(1);
        //$sex_list = [['id' => 0, 'title' => 'Нет' ]];
        //$sex_list = array_merge($sex_list, Sex::select('id', 'title')->orderBy('id', 'asc')->get()->toArray());
        $config_user_data_view_list = UserConfigsView::all();

        return response()->json([
            //'words' => $words,
            //'proverb' => $proverb[0],
            //'config_user_data_view_list' => $config_user_data_view_list,
            //'sex_list' => $sex_list,
            'title' => '',
            'description' => '',
            'keywords' => '',
            'footer' => [
                '2010 - ' . date('Y') . ' гг ApprendereFr.ru',
                'E-mail: admin@apprendrefr.ru'
            ],
            'data' => [],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
    }
}
