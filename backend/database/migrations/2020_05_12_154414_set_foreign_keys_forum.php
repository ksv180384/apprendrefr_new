<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


/**
 * Добавление связей между таблицами
 * Class SetForeignKeysForum
 */
class SetForeignKeysForum extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('forum_forums', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('last_message_id')->references('id')->on('forum_messages');
            $table->foreign('status')->references('id')->on('forum_statuses');
        });
        Schema::table('forum_topics', function (Blueprint $table) {
            $table->foreign('forum_id')->references('id')->on('forum_forums')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('last_message_id')->references('id')->on('forum_messages');
            $table->foreign('status')->references('id')->on('forum_statuses');
        });
        Schema::table('forum_messages', function (Blueprint $table) {
            $table->foreign('topic_id')->references('id')->on('forum_topics')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('rang')->references('id')->on('rangs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        /*
        Schema::table('forum_messages', function (Blueprint $table) {
            $table->dropForeign('user_id_foreign');
            $table->dropForeign('last_message_id_foreign');
            $table->dropForeign('status_foreign');
        });
        Schema::table('forum_topics', function (Blueprint $table) {
            $table->dropForeign('user_id_foreign');
            $table->dropForeign('last_message_id_foreign');
            $table->dropForeign('status_foreign');
        });
        Schema::table('forum_messages', function (Blueprint $table) {
            $table->dropForeign('user_id_foreign');
        });
        */
    }
}
