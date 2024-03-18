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
        Schema::table('player_songs', function (Blueprint $table) {
            $table->dropIndex('player_songs_artist_name_title_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
