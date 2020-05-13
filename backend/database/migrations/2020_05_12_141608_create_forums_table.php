<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('forum_forums', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('title', 500)->comment('название форума');
            $table->unsignedBigInteger('user_id')->nullable()->default(null)->comment('идентификатор пользоваеля создавшего форум');
            $table->unsignedBigInteger('last_message_id')->nullable()->default(null)->comment('идентификатор последнего сообщения форума');
            $table->unsignedBigInteger('status')->index()->comment('статус форума');
            $table->integer('sort')->comment('порядок вывода форумов');
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
        Schema::dropIfExists('forum_forums');
    }
}
