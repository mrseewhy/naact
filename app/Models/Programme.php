<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    //
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'gallery',
        'date_of_event',
    ];

    protected $casts = [
        'gallery' => 'array',
        'date_of_event' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->whereDate('date_of_event', '>=', today())->orderBy('date_of_event');
    }

    public function scopePast(Builder $query): Builder
    {
        return $query->whereDate('date_of_event', '<', today())->orderByDesc('date_of_event');
    }
}
