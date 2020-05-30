<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::group([ 'middleware' => 'api', 'namespace' => 'Api'], function ($router) {

    Route::post('index', 'IndexController@index')->name('api.index');

    Route::group(['prefix' => 'user', 'namespace' => 'User'], function ($router) {

        Route::post('update/{id}', 'UserController@update')->name('api.user.update');
    });

    Route::group(['prefix' => 'auth','namespace' => 'Auth',], function ($router) {

        Route::post('login', 'AuthController@login');
        Route::post('registration', 'AuthController@registration');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');

        Route::post('register-page', 'AuthController@register_page')->name('api.registration_page');
        Route::post('login-page', 'AuthController@login_page')->name('api.login_page');

    });

    // Word
    Route::group(['prefix' => 'word', 'namespace' => 'Word'], function ($router) {

        Route::get('random-list', 'WordController@randomList')->name('api.word.random_list');
    });

});