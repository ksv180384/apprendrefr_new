<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forum_topics', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('title', 500)->comment('название темы');
            $table->unsignedBigInteger('forum_id')->index()->comment('идентификатор форума в котором находится тема');
            $table->unsignedBigInteger('user_id')->index()->comment('идентификатор пользователя создавшего тему');
            $table->integer('count_views')->default(0)->comment('количество посмотров темы');
            $table->unsignedBigInteger('last_message_id')->index()->nullable()->default(null)
                  ->comment('идентификатор последнего сообщения темы');
            $table->unsignedBigInteger('status')->index()->comment('статус темы');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topics');
    }
}
