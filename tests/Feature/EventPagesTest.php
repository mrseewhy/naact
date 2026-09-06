<?php

use App\Models\Event;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

test('event pages separate and order upcoming and past events', function () {
    Carbon::setTestNow('2026-09-06 12:00:00');

    $past = Event::create([
        'title' => 'Past Event',
        'slug' => 'past-event',
        'description' => 'A past community event.',
        'start_date' => '2026-09-01',
    ]);
    $ongoing = Event::create([
        'title' => 'Ongoing Event',
        'slug' => 'ongoing-event',
        'description' => 'An ongoing community event.',
        'start_date' => '2026-09-05',
        'end_date' => '2026-09-07',
    ]);
    $upcoming = Event::create([
        'title' => 'Upcoming Event',
        'slug' => 'upcoming-event',
        'description' => 'An upcoming community event.',
        'start_date' => '2026-09-10',
    ]);

    $this->get(route('pages.events'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('all-pages/Events')
            ->has('upcomingEvents.data', 2)
            ->where('upcomingEvents.data.0.id', $ongoing->id)
            ->where('upcomingEvents.data.1.id', $upcoming->id)
            ->has('pastEvents.data', 1)
            ->where('pastEvents.data.0.id', $past->id));

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('all-pages/Home')
            ->has('events', 2)
            ->where('events.0.id', $ongoing->id)
            ->where('events.1.id', $upcoming->id));
});
