<?php

Route::get('/search', [\App\Http\Controllers\Api\V1\SearchController::class, 'searchAll']);

Route::group(['prefix' => 'page'], function (){
    Route::get('/', [\App\Http\Controllers\Api\IndexController::class, 'index'])->middleware(['page_info_default', 'page_info_statistic']);
});
