<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //

    protected $fillable = [
        'title',
        'slug',
        'description',
        'start_date',
        'end_date',
        'location',
        'image',
        'gallery',

    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'gallery' => 'array',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query
            ->where(function (Builder $query) {
                $query->whereDate('end_date', '>=', today())
                    ->orWhere(function (Builder $query) {
                        $query->whereNull('end_date')->whereDate('start_date', '>=', today());
                    });
            })
            ->orderBy('start_date');
    }

    public function scopePast(Builder $query): Builder
    {
        return $query
            ->where(function (Builder $query) {
                $query->whereDate('end_date', '<', today())
                    ->orWhere(function (Builder $query) {
                        $query->whereNull('end_date')->whereDate('start_date', '<', today());
                    });
            })
            ->orderByDesc('start_date');
    }
}
