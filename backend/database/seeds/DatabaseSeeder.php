<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SexSeeder::class);
        $this->call(RangSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProverbSeeder::class);
        $this->call(WordSeeder::class);
        $this->call(UserConfigSeeder::class);
        $this->call(UserInfoSeeder::class);
        $this->call(PlayerSongArtistSeeder::class);
        $this->call(PlayerSongSeeder::class);
        $this->call(PlayerSongSearchSeeder::class);
        $this->call(ForumSeeder::class);
        $this->call(GrammarSeeder::class);
    }
}
