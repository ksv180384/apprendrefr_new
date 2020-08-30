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

// Включаем подтверждение регистрации по емаил
//Auth::routes(['verify' => true]);

Route::group([ 'middleware' => 'api', 'namespace' => 'Api'], function ($router) {

    Route::get('index', 'IndexController@index')->name('api.index');

    // User
    Route::group(['prefix' => 'user', 'namespace' => 'User'], function ($router) {

        Route::get('profile-page', 'UserController@index')->name('api.user.profile-page');
        Route::get('info-page/{id}', 'UserController@show')->name('api.user.info');
        Route::get('list-page', 'UserController@listUsers')->name('api.user.list_users');
        Route::get('list/paginate', 'UserController@getUsersListPaginate')->name('api.user.list_users_paginate');
        Route::get('confirm-email/{token}', 'UserController@confirmEmail')->name('api.user.confirm-email');

        Route::post('update/{id}', 'UserController@update')->name('api.user.update');
        Route::post('send-confirm-email', 'UserController@sendConfirmEmail')->name('api.user.send_confirm_email');
    });

    // Auth
    Route::group(['prefix' => 'auth','namespace' => 'Auth',], function ($router) {

        Route::post('login', 'AuthController@login');
        Route::post('registration', 'AuthController@registration');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::get('change-password-page', 'AuthController@changePasswordPage');
        Route::get('lost-password-page', 'AuthController@lostPasswordPage');

        Route::get('register-page', 'AuthController@registerPage')->name('api.registration_page');
        Route::post('login-page', 'AuthController@loginPage')->name('api.login_page');
        Route::post('lost-password', 'AuthController@lostPassword')->name('api.lost_password');
        Route::post('change-password', 'AuthController@changePassword')->name('api.change_password');
        Route::post('profile-change-password', 'AuthController@profileChangePassword')->name('api.profile_change_password');

    });

    // Word
    Route::group(['prefix' => 'word', 'namespace' => 'Word'], function ($router) {

        Route::get('random-list', 'WordController@randomList')->name('api.word.random_list');
        // Получаем слова для теста
        Route::get('random-test-yourself', 'WordController@testYourSelf')->name('api.word.test_yourself');
        Route::get('item/{id}', 'WordController@getItem')->name('api.word.item');

        Route::get('list', 'WordController@index')->name('api.word.list');
        Route::get('list-paginate', 'WordController@listPaginate')->name('api.word.list_paginate');
        Route::get('item-page/{id}', 'WordController@show')->name('api.word.show');

        Route::post('search', 'WordController@search')->name('api.word.search');
        Route::post('search-page', 'WordController@searchPage')->name('api.word.search_page');
    });

    // Proverb
    /*
    Route::group(['prefix' => 'proverb', 'namespace' => 'Proverb'], function ($router) {

        Route::get('random', 'ProverbController@randomProverb')->name('api.proverb.random');
    });
    */
    // song player
    Route::group(['prefix' => 'song', 'namespace' => 'Song'], function ($router) {

        Route::get('list', 'SongController@list')->name('api.song.list');
        Route::get('item/{id}', 'SongController@song')->name('api.song.item');

        Route::post('search-by-artist-and-title', 'SongController@searchByArtistAndTitle')->name('api.song.search_by_artist_and_title');
        Route::post('search', 'SongController@search')->name('api.song.search');
    });

    // song page
    Route::group(['prefix' => 'lyrics', 'namespace' => 'Song'], function ($router) {

        Route::get('list', 'SongController@index')->name('api.lyrics.list');
        Route::get('item/{id}', 'SongController@show')->name('api.lyrics.item');
    });

    // forum
    Route::group(['prefix' => 'forum', 'namespace' => 'Forum'], function ($router) {

        Route::get('{forum_id?}/', 'ForumController@index')->name('api.forums_list');
        Route::get('{forum_id?}/topic/list', 'TopicController@index')->name('api.forum_topics_list');

        Route::post('send-message', 'MessageController@store')->name('api.forum_send_message');
        Route::patch('update-message/{id}', 'MessageController@update')->name('api.forum_update_message');

        Route::post('create-them', 'TopicController@store')->name('api.forum_topic_create');
        Route::patch('update-them/{id}', 'TopicController@update')->name('api.forum_topic_update');

        Route::group(['prefix' => '{forum_id?}/topic/{topic_id?}'], function ($router) {

            Route::get('messages', 'MessageController@index')->name('api.forum_messages_list');
            Route::get('messages-paginate', 'MessageController@getMessagesPaginate')
                    ->name('api.forum_messages_paginate');

            //Route::patch('change-status', 'TopicController@updateStatus')->name('api.forum_topic_update_status');
        });
        Route::group(['prefix' => 'topic'], function ($router) {
            Route::patch('change-status', 'TopicController@updateStatus')->name('api.forum_topic_update_status');
        });
        Route::group(['prefix' => 'message'], function ($router) {
            Route::patch('hide', 'MessageController@hide')->name('api.forum_message_hide');
        });
    });

    // grammar
    Route::group(['prefix' => 'grammar'], function ($router) {

        Route::get('/', 'GrammarController@index')->name('api.grammar_list');
        Route::get('/item-page/{id}', 'GrammarController@showPage')->name('api.grammar_page');
        Route::get('/item/{id}', 'GrammarController@show')->name('api.grammar_item');
    });

    // lessons
    Route::group(['prefix' => 'lessons'], function ($router) {

        Route::get('/', 'LessonsController@index')->name('api.lesson_list');
        Route::get('/item-page/{id}', 'LessonsController@showPage')->name('api.lesson_page');
        Route::get('/item/{id}', 'LessonsController@show')->name('api.lesson_item');
    });

    // info
    Route::group(['prefix' => 'info'], function ($router) {
        Route::get('privacy-policy', 'InfoController@PrivacyPolicy');
        Route::get('terms-user', 'InfoController@TermsUser');
    });

    // search
    Route::post('search', 'SearchController@searchAll')->name('api.search_all');
});