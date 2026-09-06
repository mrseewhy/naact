<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProgrammeRequest;
use App\Models\Programme;
use App\Support\PublicFileTransaction;
use Inertia\Inertia;

class ProgrammeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $programmes = Programme::latest()->paginate(20);

        return Inertia::render('admin/programme/Index', ['programmes' => $programmes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('admin/programme/Create');
    }

    public function store(ProgrammeRequest $request)
    {
        $validated = $request->validated();
        $files = new PublicFileTransaction;

        try {
            $files->run(function () use ($request, $validated, $files) {
                $programme = Programme::create([
                    'title' => $validated['title'],
                    'slug' => $validated['slug'],
                    'description' => $validated['description'],
                    'date_of_event' => $validated['date_of_event'],
                ]);

                if ($request->hasFile('image')) {
                    $filename = $programme->slug.'-'.time().'.'.$request->image->getClientOriginalExtension();
                    $programme->image = $files->store($request->file('image'), 'programmes/featured', $filename);
                }

                if ($request->hasFile('gallery')) {
                    $programme->gallery = $files->syncGallery(
                        [],
                        $request->file('gallery'),
                        [],
                        'programmes/gallery',
                        fn ($file, $index) => $programme->slug.'-gallery-'.$index.'-'.time().'.'.$file->getClientOriginalExtension(),
                    );
                }

                $programme->save();
            });

            return to_route('programmes.index')
                ->with('success', 'Programme created successfully!');
        } catch (\Exception $e) {
            return to_route('programmes.create')
                ->withInput()
                ->with('error', 'Something went wrong. Please try again.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Programme $programme)
    {
        //
        return Inertia::render('admin/programme/Edit', ['programme' => $programme]);
    }

    public function update(ProgrammeRequest $request, Programme $programme)
    {
        $validated = $request->validated();
        $deletedImages = $validated['deletedImages'] ?? [];
        $files = new PublicFileTransaction;
        $editRouteKey = $programme->getRouteKey();

        try {
            $files->run(function () use ($request, $validated, $deletedImages, $programme, $files) {
                $programme->fill([
                    'title' => $validated['title'],
                    'slug' => $validated['slug'],
                    'description' => $validated['description'],
                    'date_of_event' => $validated['date_of_event'],
                ]);

                if ($request->hasFile('image')) {
                    $filename = $programme->slug.'-'.time().'.'.$request->image->getClientOriginalExtension();
                    $programme->image = $files->replace(
                        $request->file('image'),
                        'programmes/featured',
                        $programme->getOriginal('image'),
                        $filename,
                    );
                }

                $programme->gallery = $files->syncGallery(
                    $programme->gallery ?? [],
                    $request->file('gallery', []),
                    $deletedImages,
                    'programmes/gallery',
                    fn ($file, $index) => $programme->slug.'-gallery-'.$index.'-'.time().'.'.$file->getClientOriginalExtension(),
                );

                $programme->save();
            });

            return to_route('programmes.index')
                ->with('success', 'Programme updated successfully!');
        } catch (\Exception $e) {
            return to_route('programmes.edit', $editRouteKey)
                ->withInput()
                ->with('error', 'Something went wrong. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programme $programme)
    {
        $files = new PublicFileTransaction;
        $files->removeAfterCommit($programme->image);
        foreach ($programme->gallery ?? [] as $image) {
            $files->removeAfterCommit($image);
        }

        try {
            $files->run(fn () => $programme->delete());

            return to_route('programmes.index')->with('success', 'Programme deleted successfully.');
        } catch (\Exception $e) {
            return to_route('programmes.index')->with('error', 'Something went wrong. Please try again.');
        }
    }
}
