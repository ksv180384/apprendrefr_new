<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE `player_songs` ADD FULLTEXT artist_name_title_index(artist_name , title)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('player_songs', function (Blueprint $table) {
            $table->dropIndex('artist_name_title_index');
        });
    }
};
