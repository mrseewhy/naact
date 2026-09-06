<?php

use App\Models\Category;
use App\Models\Event;
use App\Models\Post;
use App\Models\Programme;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;

test('public page routes are named and use consistent URLs', function () {
    $pages = [
        'home' => '/',
        'pages.about' => '/about',
        'pages.businesses' => '/businesses',
        'pages.programmes' => '/programmes',
        'pages.events' => '/events',
        'pages.blog' => '/blog',
        'pages.contact' => '/contact',
        'pages.donate' => '/donate',
        'pages.get-involved' => '/get-involved',
        'pages.privacy-policy' => '/privacy-policy',
        'pages.terms' => '/terms',
        'register' => '/register',
    ];

    foreach ($pages as $name => $url) {
        expect(route($name, absolute: false))->toBe($url);
    }

    expect(route('blog.show', 'article', false))->toBe('/blog/article')
        ->and(route('event.show', 'community-day', false))->toBe('/events/community-day')
        ->and(route('programme.show', 'mentoring', false))->toBe('/programmes/mentoring');
});

test('dashboard operations share the dashboard prefix', function () {
    $dashboardRoutes = collect(Route::getRoutes())->filter(function ($route) {
        $name = $route->getName();

        return $name === 'dashboard'
            || $name === 'contact.index'
            || $name === 'contacts.mark-as-read'
            || str_starts_with((string) $name, 'users.')
            || str_starts_with((string) $name, 'categories.')
            || str_starts_with((string) $name, 'posts.')
            || str_starts_with((string) $name, 'events.')
            || str_starts_with((string) $name, 'programmes.');
    });

    expect($dashboardRoutes)->not->toBeEmpty();

    foreach ($dashboardRoutes as $route) {
        expect($route->uri())->toStartWith('dashboard');
    }
});

test('public content detail routes bind records by slug', function () {
    $category = Category::create(['title' => 'News', 'slug' => 'news']);
    $post = Post::create([
        'category_id' => $category->id,
        'title' => 'Community News',
        'slug' => 'community-news',
        'body' => 'The latest news from our community.',
    ]);
    $event = Event::create([
        'title' => 'Community Day',
        'slug' => 'community-day',
        'description' => 'A community event.',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
        'location' => 'Canberra',
    ]);
    $programme = Programme::create([
        'title' => 'Mentoring',
        'slug' => 'mentoring',
        'description' => 'A mentoring programme.',
        'date_of_event' => '2026-10-16 10:00:00',
    ]);

    $this->get(route('blog.show', $post->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('all-pages/ShowBlog')->where('post.id', $post->id));

    $this->get(route('event.show', $event->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('all-pages/ShowEvent')->where('event.id', $event->id));

    $this->get(route('programme.show', $programme->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('all-pages/ShowProgramme')->where('programme.id', $programme->id));
});
