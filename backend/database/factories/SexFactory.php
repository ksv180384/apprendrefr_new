<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\User\Sex;
use Faker\Generator as Faker;

$factory->define(Sex::class, function (Faker $faker) {
    return [
        //
        'title' => $faker->name,
    ];
});
