<?php

namespace App\Providers;

use App\Http\Kernel;
use Carbon\CarbonInterval;
use Illuminate\Database\Connection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Events\QueryExecuted;
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
        // Exception при n+1 query, обращение к несущестующему атрибуту (3 в одном)
        // Model::preventLazyLoading()
        // Model::preventSilentlyDiscardingAttributes()
        // Model::preventsAccessingMissingAttributes()
        Model::shouldBeStrict(/*!app()->isProduction()*/);
//        Model::preventSilentlyDiscardingAttributes(); // Используется чтоб в модели можно было не куазывать $fillable

        // Запрос к БД отрабатывает долго
        \DB::listen(function (QueryExecuted $query){
            if($query->time > 500){
                logger()
                    ->channel('telegram')
                    ->debug('Долгий запрос к БД: ' . $query->sql . "\n" . join(' | ', $query->bindings));
            }
        });

        // Если запрос к приложению выполняется более 4 сек, то логируем этот зпрос
        /*
        $kernel = app(Kernel::class);
        $kernel->whenRequestLifecycleIsLongerThan(
            CarbonInterval::seconds(1),
            function(){
                logger()
                    ->channel('telegram')
                    ->debug('Долгий запрос к приложению: ' . request()->url());
            }
        );
        */

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
