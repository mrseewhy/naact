<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Support\PublicFileTransaction;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->paginate(20);

        return Inertia::render('admin/posts/Index', ['posts' => $posts]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('admin/posts/Create', ['categories' => $categories]);
    }

    public function store(PostRequest $request)
    {
        $validated = $request->validated();
        $files = new PublicFileTransaction;

        try {
            $files->run(function () use ($request, &$validated, $files) {
                if ($request->hasFile('image')) {
                    $filename = Str::slug($request->title).'-'.time().'.'.$request->image->getClientOriginalExtension();
                    $validated['image'] = $files->store($request->file('image'), 'posts', $filename);
                }

                Post::create($validated);
            });

            return to_route('posts.index')->with('success', 'Post created successfully.');
        } catch (\Exception $e) {
            return to_route('posts.index')->with('error', 'An error occurred while creating the post.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
        $post->load('category');
        $categories = Category::all();

        return Inertia::render('admin/posts/Edit', ['post' => $post, 'categories' => $categories]);
    }

    public function update(PostRequest $request, Post $post)
    {
        $validated = $request->validated();
        $files = new PublicFileTransaction;

        try {
            $files->run(function () use ($request, &$validated, $post, $files) {
                if ($request->hasFile('image')) {
                    $filename = Str::slug($request->title).'-'.time().'.'.$request->image->getClientOriginalExtension();
                    $validated['image'] = $files->replace($request->file('image'), 'posts', $post->image, $filename);
                } else {
                    unset($validated['image']);
                }

                $post->update($validated);
            });

            return to_route('posts.index')->with('success', 'Post updated successfully.');
        } catch (\Exception $e) {
            return to_route('posts.index')->with('error', 'An error occurred while updating the post.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $files = new PublicFileTransaction;
        $files->removeAfterCommit($post->image);

        try {
            $files->run(function () use ($post) {
                $post->delete();
            });

            return to_route('posts.index')->with('success', 'Post deleted successfully.');
        } catch (\Exception $e) {
            return to_route('posts.index')->with('error', 'An error occurred while deleting the post.');
        }
    }
}
