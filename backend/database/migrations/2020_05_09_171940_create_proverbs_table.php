<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProverbsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proverbs', function (Blueprint $table) {
            $table->id();
            $table->text('text');
            $table->text('translation');
        });
    }
/*
INSERT INTO apprendrefr_new.proverbs (`text`, `translation`)
SELECT `posl`, `per_posl` FROM apprendrefr.poslovica
*/
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('proverbs');
    }
}
