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
        Schema::create('users', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('login', 255)->unique();
            $table->string('email', 255)->unique();
            $table->timestamp('email_verified_at')->nullable()->default(null);
            $table->string('password');
            $table->string('avatar', 500)->nullable()->default(null);
            $table->bigInteger('sex')->nullable()->default(null); // Пол пользователя
            $table->text('info')->nullable()->default(null); // Информация о себе
            $table->text('signature')->nullable()->default(null);
            $table->string('residence', 500)->nullable()->default(null); // Место жительства
            $table->bigInteger('rang')->nullable()->default(null);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
