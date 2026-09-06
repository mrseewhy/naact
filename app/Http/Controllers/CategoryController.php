<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        //
        $categories = Category::latest()->paginate(20);

        return Inertia::render('admin/category/Index', ['categories' => $categories]);
    }

    public function create()
    {
        //
        return Inertia::render('admin/category/Create');
    }

    public function store(Request $request)
    {
        $request->merge(['slug' => Str::slug((string) $request->input('title'))]);
        $validated = $request->validate([
            'title' => 'required|min:3|max:255|string|unique:categories,title',
            'slug' => 'required|max:255|string|unique:categories,slug',
        ]);

        DB::transaction(function () use ($validated) {
            Category::create($validated);
        });

        return to_route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit(Category $category)
    {
        //

        return Inertia::render('admin/category/Edit', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        $request->merge(['slug' => Str::slug((string) $request->input('title'))]);
        $validated = $request->validate([
            'title' => [
                'required',
                'min:3',
                'max:255',
                'string',
                Rule::unique('categories', 'title')->ignore($category->id),
            ],
            'slug' => ['required', 'max:255', 'string', Rule::unique('categories', 'slug')->ignore($category->id)],
        ]);

        DB::transaction(function () use ($category, $validated) {
            $category->update($validated);
        });

        return to_route('categories.index')->with('success', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        if (Category::count() <= 1) {
            return to_route('categories.index')->with('error', 'At least one category must exist. Cannot delete the last category.');
        }

        if ($category->id === 1) {
            return to_route('categories.index')->with('error', 'The default category cannot be deleted.');
        }

        if ($category->posts()->count() > 0) {
            return to_route('categories.index')->with('error', 'Cannot delete category with existing posts. Please reassign or delete the posts first.');
        }

        try {
            DB::transaction(function () use ($category) {
                $category->delete();
            });

            return to_route('categories.index')->with('success', 'Category deleted successfully!');
        } catch (\Exception $e) {
            return to_route('categories.index')->with('error', 'An error occurred while deleting the category.');
        }
    }
}
