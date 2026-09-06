<?php

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

test('category titles and slugs are unique at the database level', function () {
    Category::create(['title' => 'Community News', 'slug' => 'community-news']);

    expect(fn () => Category::create(['title' => 'Community News', 'slug' => 'different-slug']))
        ->toThrow(QueryException::class);
    expect(fn () => Category::create(['title' => 'Different Title', 'slug' => 'community-news']))
        ->toThrow(QueryException::class);
});

test('content tables have indexes supporting their actual lookups and ordering', function () {
    $indexNames = fn (string $table) => collect(Schema::getIndexes($table))->pluck('name');

    expect($indexNames('contacts'))->toContain('contacts_read_created_at_index', 'contacts_created_at_index')
        ->and($indexNames('categories'))->toContain('categories_title_unique', 'categories_slug_unique', 'categories_created_at_index')
        ->and($indexNames('posts'))->toContain('posts_category_id_index', 'posts_slug_unique', 'posts_created_at_index')
        ->and($indexNames('events'))->toContain('events_slug_unique', 'events_start_date_index', 'events_created_at_index')
        ->and($indexNames('programmes'))->toContain('programmes_slug_unique', 'programmes_date_of_event_index', 'programmes_created_at_index');
});

test('deleting a category cascades deliberately to its posts', function () {
    $category = Category::create(['title' => 'Temporary', 'slug' => 'temporary']);
    $post = Post::create([
        'category_id' => $category->id,
        'title' => 'Temporary Post',
        'slug' => 'temporary-post',
        'body' => 'Temporary content.',
    ]);

    $category->delete();

    $this->assertDatabaseMissing('posts', ['id' => $post->id]);
});
