<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerSearchSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Таблица в которую попадают ненайденые песни (при открытии пользователеи файла)
        // Так же поней осуществляется поиск если песня не была найдена в основной таблице
        Schema::create('player_search_songs', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('artist')->index()->comment('исполнитель');
            $table->string('title')->index()->comment('название песни');
            $table->string('title_file')->index()->comment('название файла');
            $table->unsignedBigInteger('song_id')->index()->nullable()->default(null)
                  ->comment('идентификатор песни в основной таблице');
            $table->timestamps();

            $table->foreign('song_id')->references('id')->on('player_songs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_search_songs');
    }
}
