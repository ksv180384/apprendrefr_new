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

/*
Route::get('{any}', function () {
    return view('index');
})->where('any', '.*');
*/

if(isset($_GET['list_songs'])){
    $_GET['list_songs'] = (int)$_GET['list_songs'];
    if($_GET['list_songs'] == 0){
        Route::redirect('{any}', 'lyrics')->where('any', '.*');
    }else{
        Route::redirect('{any}', 'lyrics/item/' . $_GET['list_songs'])->where('any', '.*');
    }

}

if(!empty($_GET['gramm'])){
    Route::redirect('{any}', 'grammar/item/' . $_GET['gramm'])->where('any', '.*');
}

if(!empty($_GET['gramm'])){
    Route::redirect('{any}', 'grammar/item/' . $_GET['gramm'])->where('any', '.*');
}

Route::get('/', 'IndexController@index')->name('index');
Route::get('/registration', 'RegistrationController@index')->name('registration');
Route::get('/lost-password', 'RegistrationController@lostPassword')->name('lost_assword');
Route::get('/profile', 'User\UserController@index')->name('profile');

Route::get('/users-list/page/{page}', 'User\UserController@listUsers')->name('users_list');
Route::get('/users-list', 'User\UserController@listUsers')->name('users_list');
Route::get('/user/confirm-email/{token?}', 'User\UserController@confirmEmail')->name('users_confirm_email');
Route::get('/user/change-password/{token?}', 'User\UserController@changePassword')->name('users_change_password');



// grammar
Route::group(['prefix' => 'grammar'], function ($router) {
    Route::get('/', 'GrammarController@index')->name('grammar_list');
    Route::get('/item/{id}', 'GrammarController@show')->name('grammar_item');
});

// song page
Route::group(['prefix' => 'lyrics', 'namespace' => 'Song'], function ($router) {
    Route::get('/', 'SongController@index')->name('lyrics.list');
    Route::get('item/{id}', 'SongController@show')->name('lyrics.item');
});

// lessons
Route::group(['prefix' => 'lessons'], function ($router) {
    Route::get('/', 'LessonsController@index')->name('lesson_list');
    Route::get('/item/{id}', 'LessonsController@show')->name('lesson_item');
});

// forum
Route::group(['prefix' => 'forum', 'namespace' => 'Forum'], function ($router) {

    Route::get('/', 'ForumController@index')->name('forums_list');
    Route::get('/{forum_id}', 'TopicController@index')->name('forum_topics_list');


    Route::group(['prefix' => '{forum_id}/topic'], function ($router) {
        Route::get('/{topic_id}/page/{page?}', 'MessageController@index')->name('forum_messages_list');
        Route::get('/{topic_id}', 'MessageController@index')->name('forum_messages_list');
    });

});

// dictionary
Route::get('word/search/{word}/{lang?}', 'DictionaryController@search')->name('word.search');
Route::group(['prefix' => 'dictionary'], function ($router) {
    Route::get('{pos}/{lang}/page/{page}', 'DictionaryController@index')->name('word.list');
    Route::get('/', 'DictionaryController@index')->name('word.list');
    Route::get('word/{id}', 'DictionaryController@show')->name('word.show');
});

// ---------------------------------------------

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