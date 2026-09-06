<?php

use App\Models\Category;
use App\Models\Contact;
use App\Models\Event;
use App\Models\Post;
use App\Models\Programme;
use App\Models\User;

test('non administrators cannot access any dashboard resource', function (string $route) {
    $this->actingAs(User::factory()->nonAdmin()->create())
        ->get(route($route))
        ->assertForbidden();
})->with([
    'users' => 'users.index',
    'contacts' => 'contact.index',
    'posts' => 'posts.index',
    'categories' => 'categories.index',
    'events' => 'events.index',
    'programmes' => 'programmes.index',
]);

test('administrators can access every dashboard resource', function (string $route) {
    $this->actingAs(User::factory()->create())
        ->get(route($route))
        ->assertOk();
})->with([
    'users' => 'users.index',
    'contacts' => 'contact.index',
    'posts' => 'posts.index',
    'categories' => 'categories.index',
    'events' => 'events.index',
    'programmes' => 'programmes.index',
]);

test('email verification is not required for administrator dashboard access', function () {
    $this->actingAs(User::factory()->unverified()->create())
        ->get(route('dashboard'))
        ->assertOk();
});

test('non administrators cannot perform high risk dashboard operations', function () {
    $actor = User::factory()->nonAdmin()->create();
    $targetUser = User::factory()->create();
    $contact = Contact::create([
        'name' => 'Member',
        'email' => 'member@example.com',
        'subject' => 'Question',
        'message' => 'A community question.',
    ]);
    $category = Category::create(['title' => 'News', 'slug' => 'news']);
    $post = Post::create([
        'category_id' => $category->id,
        'title' => 'Post',
        'slug' => 'post',
        'body' => 'Post content.',
    ]);
    $event = Event::create([
        'title' => 'Event',
        'slug' => 'event',
        'description' => 'Event details.',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
    ]);
    $programme = Programme::create([
        'title' => 'Programme',
        'slug' => 'programme',
        'description' => 'Programme details.',
        'date_of_event' => '2026-10-16 10:00:00',
    ]);

    $this->actingAs($actor);
    $this->delete(route('users.destroy', $targetUser))->assertForbidden();
    $this->put(route('contacts.mark-as-read', $contact))->assertForbidden();
    $this->delete(route('posts.destroy', $post))->assertForbidden();
    $this->delete(route('categories.destroy', $category))->assertForbidden();
    $this->delete(route('events.destroy', $event))->assertForbidden();
    $this->delete(route('programmes.destroy', $programme))->assertForbidden();

    $this->assertDatabaseHas('users', ['id' => $targetUser->id]);
    $this->assertDatabaseHas('contacts', ['id' => $contact->id, 'read' => false]);
    $this->assertDatabaseHas('posts', ['id' => $post->id]);
    $this->assertDatabaseHas('categories', ['id' => $category->id]);
    $this->assertDatabaseHas('events', ['id' => $event->id]);
    $this->assertDatabaseHas('programmes', ['id' => $programme->id]);
});
