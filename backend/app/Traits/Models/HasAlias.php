<?php

namespace App\Traits\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasAlias
{
    protected static function bootHasAlias()
    {
        parent::boot();

        static::creating(function (Model $model){
            $model->alias = $model->alias ?? str($model->{self::slugFrom()})->append(time())->slug();
        });
    }

    public static function slugFrom(): string
    {
        return 'title';
    }
}