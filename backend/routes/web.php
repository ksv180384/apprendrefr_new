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

Route::get('/', function () {
    return view('index');
});

Route::group(['namespace' => 'JsonData', 'prefix' => 'json'], function () {

    Route::post('index', 'IndexController@index')->name('json.index');

    Route::group(['namespace' => 'Auth'], function () {
        Route::post('register', 'RegisterController')->name('json.register');
        Route::post('login', 'LoginController')->name('json.login');
        Route::post('logout', 'LogoutController')->name('json.logout');
    });
});