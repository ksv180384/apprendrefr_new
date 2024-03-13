<?php

Route::get('/search', [\App\Http\Controllers\Api\V1\SearchController::class, 'searchAll']);

Route::get('song/search-by-artist-and-title', [\App\Http\Controllers\Api\V1\Song\SongController::class, 'searchByArtistAndTitle']);

Route::group(['prefix' => 'auth', 'middleware' => ['page_info_default', 'page_info_statistic']], function (){

    // Auth
    Route::post('/login', [\App\Http\Controllers\Api\V1\Auth\LoginController::class, 'authenticate']);
    Route::post('/logout', [\App\Http\Controllers\Api\V1\Auth\LoginController::class, 'logout']);
    Route::post('/register', [\App\Http\Controllers\Api\V1\Auth\RegisterController::class, 'register']);
});

Route::group(['prefix' => 'page', 'middleware' => ['page_info_default', 'page_info_statistic']], function (){
    Route::get('/', [\App\Http\Controllers\Api\V1\IndexController::class, 'index']);
});
