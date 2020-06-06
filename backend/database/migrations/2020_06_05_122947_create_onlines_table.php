<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOnlinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('online', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->default(null)->comment('Идентификатор пользователя');
            $table->string('token', 200)->unique()->comment('Токен пользователя');
            $table->string('ip', 100)->nullable()->default(null)->comment('ip пользователя');
            $table->boolean('is_bot')->default(false)->default(null)->comment('Является липользователь ботом');
            $table->string('bot_name', 255)->nullable()->default(null)->comment('Название бота');
            $table->timestamp('date')->useCurrent()->comment('Дата последнего посещения.');

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
        Schema::dropIfExists('onlines');
    }
}
