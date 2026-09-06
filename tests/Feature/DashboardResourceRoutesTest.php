<?php

use Illuminate\Support\Facades\Route;

test('dashboard resources expose only their implemented actions', function () {
    $resources = ['users', 'categories', 'posts', 'events', 'programmes'];
    $actions = ['index', 'create', 'store', 'edit', 'update', 'destroy'];

    foreach ($resources as $resource) {
        foreach ($actions as $action) {
            expect(Route::has("{$resource}.{$action}"))->toBeTrue();
        }

        expect(Route::has("{$resource}.show"))->toBeFalse();
    }
});

test('dashboard resource routes use the expected HTTP methods', function () {
    $expectedMethods = [
        'index' => ['GET', 'HEAD'],
        'create' => ['GET', 'HEAD'],
        'store' => ['POST'],
        'edit' => ['GET', 'HEAD'],
        'update' => ['PUT', 'PATCH'],
        'destroy' => ['DELETE'],
    ];

    foreach (['users', 'categories', 'posts', 'events', 'programmes'] as $resource) {
        foreach ($expectedMethods as $action => $methods) {
            $route = Route::getRoutes()->getByName("{$resource}.{$action}");

            expect($route)->not->toBeNull()
                ->and($route->methods())->toBe($methods);
        }
    }
});
