<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proverb extends Model
{
    //
    public $timestamps = false;

    protected $fillable = [
      'text',
      'translation',
    ];
}
