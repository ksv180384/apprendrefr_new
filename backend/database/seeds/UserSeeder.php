<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $users = DB::connection('mysql2')->table('users')
                    ->select('id', 'login', 'email', 'password', 'avatar', 'pol', 'o_sebe',
                    'podpis', 'rang', 'data_reg')->get();

        DB::connection('mysql');
        foreach ($users as $user){
            if($user->pol == 'Женский'){
                $pol = 2;
            }elseif($user->pol == 'Мужской'){
                $pol = 1;
            }else{
                $pol = null;
            }


            \App\Models\User::create([
               'id' => $user->id,
               'login' => $user->login,
               'email' => $user->email?:null,
               'email_verified_at' => \Carbon\Carbon::now(),
               'password' => bcrypt($user->password),
               'avatar' => $user->avatar,
               'sex' => $pol,
               'info' => $user->o_sebe,
               'rang' => $user->rang,
               'created_at' => $user->data_reg,
               'updated_at' => \Carbon\Carbon::now(),
            ]);
        }

    }
}
