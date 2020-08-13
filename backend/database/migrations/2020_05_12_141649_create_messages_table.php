<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forum_message_status', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('title', 200);
            $table->string('alias', 150)->unique();
        });

        Schema::create('forum_messages', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->text('message')->comment('текст сообщения');
            $table->unsignedBigInteger('topic_id')->index()->comment('идентификатор темы форума в которой находится сообщение');
            $table->unsignedBigInteger('user_id')->index()->comment('идентификатор пользователя');
            $table->unsignedBigInteger('status')->index()->comment('статус сообщения');
            $table->timestamps();

            $table->foreign('status')->references('id')->on('forum_message_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum_messages');
        Schema::dropIfExists('forum_message_status');
    }
}
