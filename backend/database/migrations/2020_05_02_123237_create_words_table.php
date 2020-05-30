<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('words_part_of_speech', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('title'); // Сллово
        });

        Schema::create('words', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->unsignedBigInteger('id_part_of_speech')->nullable()->default(null)->index()->comment('часть речи'); // Часть речи
            $table->string('word')->index()->comment('сллово'); // Сллово
            $table->string('translation')->nullable()->default(null)->comment('превод'); // Превод
            $table->string('transcription')->nullable()->default(null)->comment('транскрипция'); // Транскрипция
            $table->text('example')->nullable()->default(null)->comment('пример'); // Пример
            $table->integer('pronunciation')->default(0)->comment('произношение'); // Произношение

            $table->foreign('id_part_of_speech')->references('id')->on('words_part_of_speech');
        });

        /*
            INSERT INTO apprendrefr_new.words_part_of_speech (`title`) SELECT `name` FROM apprendrefr.slova_part_of_speech
        */
        /*
        INSERT INTO apprendrefr_new.words (`id_part_of_speech`, `word`, `translation`, `transcription`, `example`, `pronunciation`)
        SELECT IF(`slova_gl`=0, NULL, `slova_gl`), `slovo`, `perevod`, `transc`, `primer`, `proiznoshenie` FROM apprendrefr.slova
        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('words');
        Schema::dropIfExists('words_part_of_speech');
    }
}
