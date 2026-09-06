<?php

use App\Models\Category;
use App\Models\Contact;
use App\Models\Event;
use App\Models\Post;
use App\Models\Programme;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('an administrator can create update and delete each content type', function () {
    $category = Category::create(['title' => 'News', 'slug' => 'news']);

    $this->post(route('posts.store'), [
        'category_id' => $category->id,
        'title' => 'Original Post',
        'slug' => 'original-post',
        'body' => 'Original post content with enough text for validation.',
    ])->assertRedirect(route('posts.index'));
    $post = Post::where('slug', 'original-post')->firstOrFail();
    $this->put(route('posts.update', $post), [
        'category_id' => $category->id,
        'title' => 'Updated Post',
        'slug' => 'updated-post',
        'body' => 'Updated post content with enough text for validation.',
    ])->assertRedirect(route('posts.index'));
    $post->refresh();
    expect($post->title)->toBe('Updated Post')->and($post->slug)->toBe('updated-post');
    $this->delete(route('posts.destroy', $post))->assertRedirect(route('posts.index'));
    $this->assertDatabaseMissing('posts', ['id' => $post->id]);

    $this->post(route('events.store'), [
        'title' => 'Original Event',
        'slug' => 'original-event',
        'description' => '<p>Original event details.</p>',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
    ])->assertRedirect(route('events.index'));
    $event = Event::where('slug', 'original-event')->firstOrFail();
    $this->put(route('events.update', $event), [
        'title' => 'Updated Event',
        'slug' => 'updated-event',
        'description' => '<p>Updated event details.</p>',
        'start_date' => '2026-10-16 10:00:00',
        'end_date' => '2026-10-16 12:00:00',
    ])->assertRedirect(route('events.index'));
    $event->refresh();
    expect($event->title)->toBe('Updated Event')->and($event->slug)->toBe('updated-event');
    $this->delete(route('events.destroy', $event))->assertRedirect(route('events.index'));
    $this->assertDatabaseMissing('events', ['id' => $event->id]);

    $this->post(route('programmes.store'), [
        'title' => 'Original Programme',
        'slug' => 'original-programme',
        'description' => '<p>Original programme details.</p>',
        'date_of_event' => '2026-10-16 10:00:00',
    ])->assertRedirect(route('programmes.index'));
    $programme = Programme::where('slug', 'original-programme')->firstOrFail();
    $this->put(route('programmes.update', $programme), [
        'title' => 'Updated Programme',
        'slug' => 'updated-programme',
        'description' => '<p>Updated programme details.</p>',
        'date_of_event' => '2026-10-17 10:00:00',
    ])->assertRedirect(route('programmes.index'));
    $programme->refresh();
    expect($programme->title)->toBe('Updated Programme')->and($programme->slug)->toBe('updated-programme');
    $this->delete(route('programmes.destroy', $programme))->assertRedirect(route('programmes.index'));
    $this->assertDatabaseMissing('programmes', ['id' => $programme->id]);
});

test('event and programme gallery images can be removed successfully', function () {
    Storage::fake('public');
    $eventPath = 'events/gallery/remove.jpg';
    $programmePath = 'programmes/gallery/remove.jpg';
    Storage::disk('public')->put($eventPath, 'event image');
    Storage::disk('public')->put($programmePath, 'programme image');

    $event = Event::create([
        'title' => 'Gallery Event',
        'slug' => 'gallery-event',
        'description' => 'Event details.',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
        'gallery' => [$eventPath],
    ]);
    $programme = Programme::create([
        'title' => 'Gallery Programme',
        'slug' => 'gallery-programme',
        'description' => 'Programme details.',
        'date_of_event' => '2026-10-16 10:00:00',
        'gallery' => [$programmePath],
    ]);

    $this->put(route('events.update', $event), [
        'title' => $event->title,
        'slug' => $event->slug,
        'description' => $event->description,
        'start_date' => $event->start_date->toDateTimeString(),
        'end_date' => $event->end_date->toDateTimeString(),
        'deletedImages' => [$eventPath],
    ])->assertRedirect(route('events.index'));
    $this->put(route('programmes.update', $programme), [
        'title' => $programme->title,
        'slug' => $programme->slug,
        'description' => $programme->description,
        'date_of_event' => $programme->date_of_event->toDateTimeString(),
        'deletedImages' => [$programmePath],
    ])->assertRedirect(route('programmes.index'));

    expect($event->fresh()->gallery)->toBe([])->and($programme->fresh()->gallery)->toBe([]);
    Storage::disk('public')->assertMissing([$eventPath, $programmePath]);
});

test('category deletion rules protect default and used categories', function () {
    $default = Category::create(['title' => 'Default', 'slug' => 'default']);
    $used = Category::create(['title' => 'Used', 'slug' => 'used']);
    $unused = Category::create(['title' => 'Unused', 'slug' => 'unused']);
    Post::create([
        'category_id' => $used->id,
        'title' => 'Categorised Post',
        'slug' => 'categorised-post',
        'body' => 'Post content.',
    ]);

    $this->delete(route('categories.destroy', $default))->assertRedirect(route('categories.index'));
    $this->delete(route('categories.destroy', $used))->assertRedirect(route('categories.index'));
    $this->delete(route('categories.destroy', $unused))->assertRedirect(route('categories.index'));

    $this->assertDatabaseHas('categories', ['id' => $default->id]);
    $this->assertDatabaseHas('categories', ['id' => $used->id]);
    $this->assertDatabaseMissing('categories', ['id' => $unused->id]);
});

test('an administrator can mark a contact as read', function () {
    $contact = Contact::create([
        'name' => 'Member',
        'email' => 'member@example.com',
        'subject' => 'Question',
        'message' => 'A community question.',
    ]);

    $this->put(route('contacts.mark-as-read', $contact))->assertRedirect(route('contact.index'));

    expect($contact->fresh()->read)->toBeTrue();
});

test('duplicate event and programme slugs are rejected before storage', function () {
    Event::create([
        'title' => 'Existing Event',
        'slug' => 'existing-event',
        'description' => 'Event details.',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
    ]);
    Programme::create([
        'title' => 'Existing Programme',
        'slug' => 'existing-programme',
        'description' => 'Programme details.',
        'date_of_event' => '2026-10-16 10:00:00',
    ]);

    $this->post(route('events.store'), [
        'title' => 'Duplicate Event',
        'slug' => 'existing-event',
        'description' => 'Duplicate event details.',
        'start_date' => '2026-10-17 10:00:00',
        'end_date' => '2026-10-17 12:00:00',
    ])->assertSessionHasErrors('slug');
    $this->post(route('programmes.store'), [
        'title' => 'Duplicate Programme',
        'slug' => 'existing-programme',
        'description' => 'Duplicate programme details.',
        'date_of_event' => '2026-10-18 10:00:00',
    ])->assertSessionHasErrors('slug');

    expect(Event::count())->toBe(1)->and(Programme::count())->toBe(1);
});
