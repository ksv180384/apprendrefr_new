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
        Schema::create('forum_messages', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->text('message')->comment('текст сообщения');
            $table->unsignedBigInteger('user_id')->index()->comment('идентификатор пользователя');
            $table->unsignedBigInteger('status')->index()->comment('статус сообщения');
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
        Schema::dropIfExists('messages');
    }
}
