<?php
namespace App\Repositories;

use App\Models\Forum\Message as Model;

/**
 * Хранилище запросов к таблице forum_messages
 * Class ForumMessageRepository
 * @package App\Repositories
 */
class ForumMessageRepository extends CoreRepository
{

    /**
     * Отдает управляемый класс
     * @return string
     */
    public function getModelClass()
    {
        return Model::class;
    }

    public function countAll(){
        $status = \DB::table('forum_message_status')->where('alias', '=', 'visible_everyone')->first();
        $count_messages = $this->startConditions()
            ->select(\DB::raw('COUNT(*) as count'))
            ->where('status', '=', $status->id)
            ->first();

        return $count_messages->count;
    }
}