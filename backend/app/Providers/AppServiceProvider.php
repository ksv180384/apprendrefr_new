<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        // создание валидации «only_user»
        // Проверяет существует ли уже поле с такими данными, если существует, то
        // проверяет принадлежит ли это поле текущему пользователю, если да, то валидация прошла успешно
        \Validator::extend('only_user', function ($attribute, $value, $parameters, $validator) {

            //var_export(\Auth::check());
            $r = \DB::table('users')
                ->select(\DB::raw('COUNT(*) as count'))
                ->where($attribute, '=', $value)
                ->first();

            if($r->count > 1){
                return false;
            }
            $user = \DB::table('users')
                ->select('id')
                ->where($attribute, '=', $value)
                ->first();
            if(!empty($user->id) && $user->id != \Auth::id()){
                return false;
            }
            return true;
        });
    }
}
