<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumTopicViewedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Таблица для контроля просмотренных тем пользователем
        // Хранит идентификатор темы, идентификатор пользователя и
        // дату последнего просмотра темы
        Schema::create('forum_topic_vieweds', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->unsignedBigInteger('user_id')->index()
                  ->comment('идентификаор пользователя');
            $table->unsignedBigInteger('topic_id')->index()->nullable()->default(null)
                  ->comment('идентификатор темы форума');
            $table->timestamp('viewed_data')
                  ->comment('дата последнего просмотра темы пользователем');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('topic_id')->references('id')->on('forum_topics');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum_topic_vieweds');
    }
}
