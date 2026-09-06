<?php

use App\Models\Category;
use App\Models\Event;
use App\Models\Post;
use App\Models\Programme;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create());
});

test('post event and programme files follow the same successful lifecycle', function () {
    $category = Category::create(['title' => 'News', 'slug' => 'news']);

    $this->post(route('posts.store'), [
        'category_id' => $category->id,
        'title' => 'Image Post',
        'slug' => 'image-post',
        'body' => 'This post contains enough useful text for validation.',
        'image' => UploadedFile::fake()->image('post.jpg'),
    ])->assertRedirect(route('posts.index'));

    $this->post(route('events.store'), [
        'title' => 'Image Event',
        'slug' => 'image-event',
        'description' => '<p>Event details</p>',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
        'image' => UploadedFile::fake()->image('event.jpg'),
        'gallery' => [UploadedFile::fake()->image('event-gallery.jpg')],
    ])->assertRedirect(route('events.index'));

    $this->post(route('programmes.store'), [
        'title' => 'Image Programme',
        'slug' => 'image-programme',
        'description' => '<p>Programme details</p>',
        'date_of_event' => '2026-10-16 10:00:00',
        'image' => UploadedFile::fake()->image('programme.jpg'),
        'gallery' => [UploadedFile::fake()->image('programme-gallery.jpg')],
    ])->assertRedirect(route('programmes.index'));

    $post = Post::where('slug', 'image-post')->firstOrFail();
    $event = Event::where('slug', 'image-event')->firstOrFail();
    $programme = Programme::where('slug', 'image-programme')->firstOrFail();
    $paths = [$post->image, $event->image, ...$event->gallery, $programme->image, ...$programme->gallery];
    Storage::disk('public')->assertExists($paths);

    $this->delete(route('posts.destroy', $post))->assertRedirect(route('posts.index'));
    $this->delete(route('events.destroy', $event))->assertRedirect(route('events.index'));
    $this->delete(route('programmes.destroy', $programme))->assertRedirect(route('programmes.index'));

    Storage::disk('public')->assertMissing($paths);
});

test('a failed post create removes its newly uploaded image', function () {
    $category = Category::create(['title' => 'News', 'slug' => 'news']);
    Post::creating(function (Post $post) {
        if ($post->slug === 'failing-post') {
            throw new RuntimeException('Simulated database failure');
        }
    });

    $this->post(route('posts.store'), [
        'category_id' => $category->id,
        'title' => 'Failing Post',
        'slug' => 'failing-post',
        'body' => 'This post contains enough useful text for validation.',
        'image' => UploadedFile::fake()->image('post.jpg'),
    ])->assertRedirect(route('posts.index'));

    $this->assertDatabaseMissing('posts', ['slug' => 'failing-post']);
    expect(Storage::disk('public')->allFiles())->toBeEmpty();
});

test('a failed event update keeps old files and removes new files', function () {
    Storage::disk('public')->put('events/featured/original.jpg', 'original');
    $event = Event::create([
        'title' => 'Original Event',
        'slug' => 'original-event',
        'description' => '<p>Original details</p>',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
        'image' => 'events/featured/original.jpg',
    ]);
    Event::updating(function (Event $event) {
        if ($event->slug === 'failing-event') {
            throw new RuntimeException('Simulated database failure');
        }
    });

    $this->put(route('events.update', $event), [
        'title' => 'Failing Event',
        'slug' => 'failing-event',
        'description' => '<p>Updated details</p>',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
        'image' => UploadedFile::fake()->image('replacement.jpg'),
    ])->assertRedirect(route('events.edit', $event));

    expect($event->fresh()->slug)->toBe('original-event');
    Storage::disk('public')->assertExists('events/featured/original.jpg');
    expect(Storage::disk('public')->allFiles())->toBe(['events/featured/original.jpg']);
});

test('a failed programme delete keeps its record and files', function () {
    $paths = ['programmes/featured/original.jpg', 'programmes/gallery/original.jpg'];
    foreach ($paths as $path) {
        Storage::disk('public')->put($path, 'original');
    }
    $programme = Programme::create([
        'title' => 'Protected Programme',
        'slug' => 'protected-programme',
        'description' => '<p>Programme details</p>',
        'date_of_event' => '2026-10-16 10:00:00',
        'image' => $paths[0],
        'gallery' => [$paths[1]],
    ]);
    Programme::deleting(function (Programme $programme) {
        if ($programme->slug === 'protected-programme') {
            throw new RuntimeException('Simulated database failure');
        }
    });

    $this->delete(route('programmes.destroy', $programme))->assertRedirect(route('programmes.index'));

    $this->assertDatabaseHas('programmes', ['id' => $programme->id]);
    Storage::disk('public')->assertExists($paths);
});
