<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_configs_view', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            $table->string('title')->comment('название');
            $table->string('alias')->comment('псевдоним');
        });

        Schema::create('user_configs', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->unsignedBigInteger('user_id')->primary()->comment('идентификатор пользователя');
            $table->boolean('day_birthday')->default(false)->comment('показывать месяц и число рождения');
            $table->boolean('yar_birthday')->default(false)->comment('показывать год рождения');
            $table->unsignedBigInteger('email')->index()->comment('кому показывать email');
            $table->unsignedBigInteger('facebook')->index()->comment('кому показывать facebook');
            $table->unsignedBigInteger('skype')->index()->comment('кому показывать skype');
            $table->unsignedBigInteger('twitter')->index()->comment('кому показывать twitter');
            $table->unsignedBigInteger('vk')->index()->comment('кому показывать vc');
            $table->unsignedBigInteger('odnoklassniki')->index()->comment('кому показывать однокласники');
            $table->unsignedBigInteger('telegram')->index()->comment('кому показывать telegram');
            $table->unsignedBigInteger('whatsapp')->index()->comment('кому показывать whatsapp');
            $table->unsignedBigInteger('viber')->index()->comment('кому показывать viber');
            $table->unsignedBigInteger('instagram')->index()->comment('кому показывать viber');
            $table->unsignedBigInteger('youtube')->index()->comment('кому показывать viber');
            $table->unsignedBigInteger('info')->index()->comment('кому показывать информацию о себе');
            $table->unsignedBigInteger('residence')->index()->comment('кому показывать масто жительства');
            $table->unsignedBigInteger('sex')->index()->comment('кому показывать пол');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->foreign('email')->references('id')->on('user_configs_view');
            $table->foreign('facebook')->references('id')->on('user_configs_view');
            $table->foreign('skype')->references('id')->on('user_configs_view');
            $table->foreign('twitter')->references('id')->on('user_configs_view');
            $table->foreign('vk')->references('id')->on('user_configs_view');
            $table->foreign('odnoklassniki')->references('id')->on('user_configs_view');
            $table->foreign('telegram')->references('id')->on('user_configs_view');
            $table->foreign('whatsapp')->references('id')->on('user_configs_view');
            $table->foreign('viber')->references('id')->on('user_configs_view');
            $table->foreign('instagram')->references('id')->on('user_configs_view');
            $table->foreign('youtube')->references('id')->on('user_configs_view');
            $table->foreign('info')->references('id')->on('user_configs_view');
            $table->foreign('residence')->references('id')->on('user_configs_view');
            $table->foreign('sex')->references('id')->on('user_configs_view');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_configs');
    }
}
