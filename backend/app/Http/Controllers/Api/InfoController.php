<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InfoController extends BaseController
{
    public function TermsUser(){

        return response()->json([
            'title' => 'Правила пользовательского соглашения ' . $_SERVER['HTTP_HOST'],
            'description' => 'Правила пользовательского соглашения ' . $_SERVER['HTTP_HOST'],
            'keywords' => 'Правила пользовательского соглашения ' . $_SERVER['HTTP_HOST'],
            'data' => [
                'terms_user' => view('registration.terms_user')->render(),
            ]
        ]);
    }

    public function PrivacyPolicy(Request $request){

        return response()->json([
            'title' => 'Политика по защите персональных данных ' . $_SERVER['HTTP_HOST'],
            'description' => 'Политика по защите персональных данных ' . $_SERVER['HTTP_HOST'],
            'keywords' => 'Политика по защите персональных данных ' . $_SERVER['HTTP_HOST'],
            'data' => [
                'privacy_policy' => view('registration.privacy_policy')->render(),
            ]
        ]);
    }
}
