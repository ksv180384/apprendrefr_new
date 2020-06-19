<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_songs', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->unsignedBigInteger('artist_id')->index()->nullable()->default(null)->comment('идентификатор исполнителя');
            $table->string('artist_name')->index()->comment('идентификатор исполнителя');
            $table->string('title')->index()->comment('название песни');
            $table->text('text_fr')->comment('текст песни на французском языке');
            $table->text('text_ru')->comment('текст песни на русском языке');
            $table->text('text_transcription')->comment('транскрипция песни');
            $table->unsignedBigInteger('user_id')->index()->nullable()->default(null)->comment('идентификатор пользователя добавившего');
            $table->boolean('hidden')->default(false)->comment('скрыть/показать');
            $table->timestamps();

            $table->index(['artist_name','title']);

            $table->foreign('artist_id')->references('id')->on('player_artists_songs');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_songs');
    }
}
