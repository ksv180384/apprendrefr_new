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

    Route::get('index', 'IndexController@index')->name('api.index');

    // User
    Route::group(['prefix' => 'user', 'namespace' => 'User'], function ($router) {

        Route::get('profile-page', 'UserController@index')->name('api.user.profile-page');
        Route::get('info-page/{id}', 'UserController@show')->name('api.user.info');

        Route::post('update/{id}', 'UserController@update')->name('api.user.update');
    });

    // Auth
    Route::group(['prefix' => 'auth','namespace' => 'Auth',], function ($router) {

        Route::post('login', 'AuthController@login');
        Route::post('registration', 'AuthController@registration');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');

        Route::get('register-page', 'AuthController@register_page')->name('api.registration_page');
        Route::post('login-page', 'AuthController@login_page')->name('api.login_page');

    });

    // Word
    Route::group(['prefix' => 'word', 'namespace' => 'Word'], function ($router) {

        Route::get('random-list', 'WordController@randomList')->name('api.word.random_list');
        Route::get('random-test-yourself', 'WordController@testYourSelf')->name('api.word.test_yourself');
        Route::get('item/{id}', 'WordController@getItem')->name('api.word.item');

        Route::post('search', 'WordController@search')->name('api.word.search');
    });

    // Proverb
    Route::group(['prefix' => 'proverb', 'namespace' => 'Proverb'], function ($router) {

        Route::get('random', 'ProverbController@randomProverb')->name('api.proverb.random');
    });

    // song
    Route::group(['prefix' => 'song', 'namespace' => 'Song'], function ($router) {

        Route::get('list', 'SongController@list')->name('api.song.list');
        Route::get('item/{id}', 'SongController@song')->name('api.song.item');

        Route::post('search-by-artist-and-title', 'SongController@searchByArtistAndTitle')->name('api.song.search_by_artist_and_title');
        Route::post('search', 'SongController@search')->name('api.song.search');
    });

    // forum
    Route::group(['prefix' => 'forum', 'namespace' => 'Forum'], function ($router) {

        Route::get('{forum_id?}/', 'ForumController@index')->name('api.forums_list');
        Route::get('{forum_id?}/topic/list', 'TopicController@index')->name('api.topics_list');

        Route::post('send-message', 'MessageController@store')->name('api.messages_send_message');

        Route::group(['prefix' => '{forum_id?}/topic/{topic_id?}'], function ($router) {

            Route::get('messages', 'MessageController@index')->name('api.messages_list');
            Route::get('messages-paginate', 'MessageController@getMessagesPaginate')->name('api.messages_paginate');
        });
    });
});