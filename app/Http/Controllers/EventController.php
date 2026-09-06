<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Support\PublicFileTransaction;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $events = Event::latest()->paginate(20);

        return Inertia::render('admin/event/Index', ['events' => $events]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('admin/event/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventRequest $request)
    {
        $validated = $request->validated();
        $files = new PublicFileTransaction;

        try {
            $files->run(function () use ($request, $validated, $files) {
                $event = Event::create([
                    'title' => $validated['title'],
                    'slug' => $validated['slug'],
                    'description' => $validated['description'],
                    'start_date' => $validated['start_date'],
                    'end_date' => $validated['end_date'] ?? null,
                    'location' => $validated['location'] ?? null,
                ]);

                if ($request->hasFile('image')) {
                    $filename = Str::slug($event->title).'-'.time().'.'.$request->image->getClientOriginalExtension();
                    $event->image = $files->store($request->file('image'), 'events/featured', $filename);
                }

                if ($request->hasFile('gallery')) {
                    $event->gallery = $files->syncGallery(
                        [],
                        $request->file('gallery'),
                        [],
                        'events/gallery',
                        fn ($file) => Str::slug($event->title).'-gallery-'.time().'-'.uniqid().'.'.$file->getClientOriginalExtension(),
                    );
                }

                $event->save();
            });

            return to_route('events.index')
                ->with('success', 'Event created successfully!');
        } catch (\Exception $e) {
            return to_route('events.create')
                ->with('error', 'Something went wrong. Please try again.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
        return Inertia::render('admin/event/Edit', ['event' => $event]);
    }

    public function update(EventRequest $request, Event $event)
    {
        $validated = $request->validated();
        $deletedImages = $validated['deletedImages'] ?? [];
        $files = new PublicFileTransaction;
        $editRouteKey = $event->getRouteKey();

        try {
            $files->run(function () use ($request, $validated, $deletedImages, $event, $files) {
                $event->fill([
                    'title' => $validated['title'],
                    'slug' => $validated['slug'],
                    'description' => $validated['description'],
                    'start_date' => $validated['start_date'],
                    'end_date' => $validated['end_date'] ?? null,
                    'location' => $validated['location'] ?? null,
                ]);

                if ($request->hasFile('image')) {
                    $event->image = $files->replace($request->file('image'), 'events/featured', $event->getOriginal('image'));
                }

                $event->gallery = $files->syncGallery(
                    $event->gallery ?? [],
                    $request->file('gallery', []),
                    $deletedImages,
                    'events/gallery',
                    fn ($file) => 'gallery-'.time().'-'.uniqid().'.'.$file->getClientOriginalExtension(),
                );

                $event->save();
            });

            return to_route('events.index')
                ->with('success', 'Event updated successfully!');
        } catch (\Exception $e) {
            return to_route('events.edit', $editRouteKey)
                ->withInput()
                ->with('error', 'Something went wrong. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $files = new PublicFileTransaction;
        $files->removeAfterCommit($event->image);
        foreach ($event->gallery ?? [] as $image) {
            $files->removeAfterCommit($image);
        }

        try {
            $files->run(fn () => $event->delete());

            return to_route('events.index')->with('success', 'Event deleted successfully.');
        } catch (\Exception $e) {
            return to_route('events.index')->with('error', 'Something went wrong. Please try again.');
        }
    }
}
