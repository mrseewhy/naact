<?php

use App\Models\Programme;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

test('a programme detail page receives its programme date', function () {
    $programme = Programme::create([
        'title' => 'Community Workshop',
        'slug' => 'community-workshop',
        'description' => 'A community workshop programme.',
        'date_of_event' => '2026-10-15 10:00:00',
    ]);

    $this->get(route('programme.show', $programme->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('all-pages/ShowProgramme')
            ->where('programme.id', $programme->id)
            ->where('programme.slug', $programme->slug)
            ->where('programme.date_of_event', fn (string $date) => str_starts_with($date, '2026-10-15'))
        );
});

test('programme pages separate and order upcoming and past programmes', function () {
    Carbon::setTestNow('2026-09-06 12:00:00');

    $past = Programme::create([
        'title' => 'Past Programme',
        'slug' => 'past-programme',
        'description' => 'A completed community programme.',
        'date_of_event' => '2026-09-01',
    ]);
    $next = Programme::create([
        'title' => 'Next Programme',
        'slug' => 'next-programme',
        'description' => 'The next community programme.',
        'date_of_event' => '2026-09-10',
    ]);
    $later = Programme::create([
        'title' => 'Later Programme',
        'slug' => 'later-programme',
        'description' => 'A later community programme.',
        'date_of_event' => '2026-09-20',
    ]);

    $this->get(route('pages.programmes'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('all-pages/Programmes')
            ->has('upcomingProgrammes.data', 2)
            ->where('upcomingProgrammes.data.0.id', $next->id)
            ->where('upcomingProgrammes.data.1.id', $later->id)
            ->has('pastProgrammes.data', 1)
            ->where('pastProgrammes.data.0.id', $past->id));

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('all-pages/Home')
            ->has('programmes', 2)
            ->where('programmes.0.id', $next->id)
            ->where('programmes.1.id', $later->id));
});
