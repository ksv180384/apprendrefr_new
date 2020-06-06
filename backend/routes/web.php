<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{any}', function () {
    return view('index');
})->where('any', '.*');

Route::group(['namespace' => 'JsonData', 'prefix' => 'json'], function () {

    Route::post('index', 'IndexController@index')->name('json.index');

    Route::group(['namespace' => 'Auth'], function () {
        Route::post('register-page', 'RegisterController@index')->name('registration');
        Route::post('login-page', 'LoginController@index')->name('login');

        Route::post('register', 'RegisterController@registration')->name('json.register');
        Route::post('login', 'LoginController@login')->name('json.login');
        Route::post('logout', 'LogoutController')->name('json.logout');
    });
});