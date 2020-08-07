<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sex', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('title', 255)->unique();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('login', 255)->unique()->comment('login пользователя');
            $table->string('email', 255)->unique()->nullable()->default(null)->comment('email пользователя');;
            $table->timestamp('email_verified_at')->nullable()->default(null)->comment('дата подтверждения email');
            $table->timestamp('send_verified_email_at')->nullable()->default(null)
                        ->comment('дата отправки сообщения на почту для подтверждения email');
            $table->string('password')->comment('пароль пользователя');
            $table->string('avatar', 500)->nullable()->default(null)->comment('аватар пользователя');
            $table->unsignedBigInteger('sex')->nullable()->default(null)->comment('пол пользователя');
            $table->timestamp('birthday')->nullable()->default(null)->comment('дата рождения пользователя');
            $table->text('info')->nullable()->default(null)->comment('информация о себе'); // Информация о себе
            $table->text('signature')->nullable()->default(null)->comment('Подпись отображается под сообщениями форума');
            $table->string('residence', 500)->nullable()->default(null)->comment('масто жительства'); // Место жительства
            $table->unsignedBigInteger('rang')->index()->nullable()->default(null)->comment('ранг пользователя');
            $table->boolean('admin')->default(false)->comment('является ли пользователь администратором');
            $table->string('confirm_token', 100)->unique()->nullable()->default(null)
                    ->comment('токен подверждения регистрации по email');
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('sex')->references('id')->on('sex');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sex');
        Schema::dropIfExists('users');
    }
}
