<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Post;
use App\Models\Programme;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function home()
    {
        $posts = Post::with('category')->latest()->take(3)->get();
        $events = Event::upcoming()->take(3)->get();
        $programmes = Programme::upcoming()->take(3)->get();

        // Keep the homepage useful when all published content has already taken place.
        // Upcoming content remains the priority, with the most recent records as a fallback.
        if ($events->isEmpty()) {
            $events = Event::query()->orderByDesc('start_date')->take(3)->get();
        }

        if ($programmes->isEmpty()) {
            $programmes = Programme::query()->orderByDesc('date_of_event')->take(3)->get();
        }

        return Inertia::render('all-pages/Home', ['posts' => $posts, 'events' => $events, 'programmes' => $programmes]);
    }

    public function about()
    {
        return Inertia::render('all-pages/About');
    }

    public function businesses()
    {
        return Inertia::render('all-pages/Businesses');
    }

    public function programmes()
    {
        $upcomingProgrammes = Programme::upcoming()->paginate(12, ['*'], 'upcoming_page');
        $pastProgrammes = Programme::past()->paginate(6, ['*'], 'past_page');

        return Inertia::render('all-pages/Programmes', [
            'upcomingProgrammes' => $upcomingProgrammes,
            'pastProgrammes' => $pastProgrammes,
        ]);
    }

    public function events()
    {

        $upcomingEvents = Event::upcoming()->paginate(12, ['*'], 'upcoming_page');
        $pastEvents = Event::past()->paginate(6, ['*'], 'past_page');

        return Inertia::render('all-pages/Events', [
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
        ]);
    }

    public function blog()
    {

        $blogposts = Post::latest()->paginate(20);
        $blogposts->load('category');

        return Inertia::render('all-pages/Blog', ['blogPosts' => $blogposts]);
    }

    public function contact()
    {
        return Inertia::render('all-pages/Contact');
    }

    public function donate()
    {
        return Inertia::render('all-pages/Donate');
    }

    public function getInvolved()
    {
        return Inertia::render('all-pages/GetInvolved');
    }

    public function terms()
    {
        return Inertia::render('all-pages/Terms');
    }

    public function privacyPolicy()
    {
        return Inertia::render('all-pages/PrivacyPolicy');
    }

    public function showBlog(Post $post)
    {
        $post->load('category');

        return Inertia::render('all-pages/ShowBlog', [
            'post' => $post,
        ]);
    }

    public function showEvent(Event $event)
    {
        return Inertia::render('all-pages/ShowEvent', [
            'event' => $event,
        ]);
    }

    public function showProgramme(Programme $programme)
    {
        return Inertia::render('all-pages/ShowProgramme', [
            'programme' => $programme,
        ]);
    }
}
