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
        Schema::table('online', function (Blueprint $table) {
            $table->integer('id')->unsigned()->change();
            $table->dropPrimary('id'); // Удаляем существующий первичный ключ
            $table->dropColumn('id');

            $table->dropUnique(['token']);

            $table->string('token')->primary()->first()->change(); // Добавляем новый первичный ключ с типом string
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('online', function (Blueprint $table) {
            $table->dropPrimary('token'); // Удаляем новый первичный ключ
            $table->id('id')->primary(); // Восстанавливаем старый первичный ключ
        });
    }
};
