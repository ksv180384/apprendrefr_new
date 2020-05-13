<?php

use Illuminate\Database\Seeder;

class RangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('rangs')->insert([
            ['title' => 'Пользователь',],
            ['title' => 'Модератор',],
            ['title' => 'Администратор',],
        ]);
    }
}
