<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    const EMAIL = 'admin@apprendrefr.ru';
    protected $yar_life;


    //
    public function __construct()
    {
        $this->yar_life = '2010 - ' . date('Y') . ' гг ApprendereFr.ru';
        // Инициализаци яобщих моментов для админки.
    }
}