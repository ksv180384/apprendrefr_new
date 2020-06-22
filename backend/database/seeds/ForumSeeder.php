<?php

use Illuminate\Database\Seeder;

class ForumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Заполняем таблицу статусов форума итем форума
        DB::connection('mysql');
        DB::table('forum_statuses')->insert([
                ['title' => 'Открыт'], // видят все пользователи сайта
                ['title' => 'Закрыт'], // видият все, но нельзя оставлять сообщения
                ['title' => 'Скрыт'], // невиден никому
                ['title' => 'Открыт только для зарегистрироывнных пользователей'],
            ]);
        // Заполняем таблицу статусов сообщений форума
        DB::table('forum_message_status')->insert([
            ['title' => 'Видят все'],
            ['title' => 'Скрыто'],
        ]);

        // Заполняем таблицу форумов
        $forums = DB::connection('mysql2')->table('forum')
            ->select('forum_id', 'naz_foruma', 'kol_tem', 'kol_massage', 'dernier_message',
                'data_forum', 'autor', 'status', 'position')->get();

        DB::connection('mysql');
        foreach ($forums as $forum){

            \App\App\Models\Forum\Forum::create([
                'id' => $forum->forum_id,
                'title' => $forum->naz_foruma,
                'user_id' => 11,
                'status' => 1,
                'sort' => $forum->position,
            ]);
        }

        // Заполняем таблицу тем форума
        $topics = DB::connection('mysql2')->table('tema')
            ->select('id_tem', 'naz_tem', 'prosmotrow', 'otvetiv', 'tema_sozdana',
                'dernier_message', 'autor', 'autor_dernier_message', 'cat_tem', 'tema_status')->get();

        DB::connection('mysql');
        foreach ($topics as $topic){

            \App\App\Models\Forum\Topic::create([
                'id' => $topic->id_tem,
                'forum_id' => $topic->cat_tem,
                'title' => $topic->naz_tem,
                'user_id' => $topic->autor,
                'count_views' => $topic->prosmotrow,
                'status' => 1,
            ]);
        }

        // Заполняем таблицу сообщений форума
        // Заполняем таблицу тем форума
        $messages = DB::connection('mysql2')->table('mess_tema')
            ->select('id_mess', 'message', 'data_mess', 'cat_mess', 'id_user_mess',
                'id_for_m', 'redactirovano', 'mess_status')->get();

        DB::connection('mysql');
        foreach ($messages as $message){

            \App\App\Models\Forum\Message::create([
                'id' => $message->id_mess,
                'message' => $message->message,
                'topic_id' => $message->cat_mess,
                'user_id' => $message->id_user_mess,
                'status' => $message->mess_status == 0 ? 1 : 2,
                'created_at' => \Carbon\Carbon::createFromTimestamp($message->data_mess)->toDateTimeString(),
                'updated_at' => !empty($message->redactirovano) ? \Carbon\Carbon::createFromTimestamp($message->redactirovano)->toDateTimeString() : null,
            ]);
        }

        // Получаем последние сообщение каждого форума
        $last_messages_list = DB::connection('mysql2')->select(DB::raw(
            'SELECT t1.`id_mess`, t1.`message`, t1.`id_for_m`, t1.`data_mess` 
                        FROM `mess_tema` AS `t1`
                        INNER JOIN (
                          SELECT MIN(`id_mess`) AS `id_mess`, MAX(`data_mess`) 
                            FROM `mess_tema` 
                            WHERE `mess_status`=0 GROUP BY `id_for_m`
                        ) AS `t2`
                        WHERE t1.`id_mess` = t2.`id_mess`'
        ));

        // Получаем список форумов для добавления идентификаторов последнего сообщения форума
        $forums = DB::connection('mysql')->table('forum_forums')
            ->select('id', 'title')->where('id', '<>', 0)->get();
        foreach ($forums as $forum){

            $last_mess = null;
            foreach ($last_messages_list as $last_message){
                if($last_message->id_for_m == $forum->id){
                    $last_mess = $last_message->id_mess;
                }
            }
            DB::table('forum_forums')->where('id', '=', $forum->id)
                ->update([
                    'last_message_id' => $last_mess,
                ]);
        }

        // Получаем последние сообщение каждой темы форума
        $last_messages_list = DB::connection('mysql2')->select(DB::raw(
            'SELECT t1.`id_mess`, t1.`message`, t1.`cat_mess`, t1.`data_mess` 
                        FROM `mess_tema` AS `t1`
                        INNER JOIN (
                          SELECT MIN(`id_mess`) AS `id_mess`, MAX(`data_mess`) 
                            FROM `mess_tema` 
                            WHERE `mess_status`=0 GROUP BY `cat_mess`
                        ) AS `t2`
                        WHERE t1.`id_mess` = t2.`id_mess`'
        ));

        // Получаем список тем форумов для добавления идентификаторов последнего сообщения форума
        $topics = DB::connection('mysql')->table('forum_topics')
            ->select('id', 'title')->where('id', '<>', 0)->get();
        foreach ($topics as $topic){

            $last_mess = null;
            foreach ($last_messages_list as $last_message){
                if($last_message->cat_mess == $topic->id){
                    $last_mess = $last_message->id_mess;
                }
            }
            DB::table('forum_topics')->where('id', '=', $topic->id)
                ->update([
                    'last_message_id' => $last_mess,
                ]);
        }
    }
}
