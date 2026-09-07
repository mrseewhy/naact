<?php

use App\Models\Category;
use App\Models\Event;
use App\Models\Post;
use App\Models\Programme;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('a valid contact submission is stored', function () {
    $this->post(route('contact.store'), [
        'name' => 'Community Member',
        'email' => 'member@example.com',
        'subject' => 'Community enquiry',
        'message' => 'I would like more information about the association.',
    ])->assertRedirect(route('pages.contact'));

    $this->assertDatabaseHas('contacts', ['email' => 'member@example.com']);
});

test('contact fields reject excessive content', function () {
    $this->from(route('pages.contact'))->post(route('contact.store'), [
        'name' => 'Community Member',
        'email' => 'member@example.com',
        'subject' => str_repeat('a', 256),
        'message' => str_repeat('a', 5001),
    ])->assertRedirect(route('pages.contact'))
        ->assertSessionHasErrors(['subject', 'message']);

    $this->assertDatabaseCount('contacts', 0);
});

test('the contact honeypot rejects bot submissions', function () {
    $this->post(route('contact.store'), [
        'name' => 'Spam Bot',
        'email' => 'bot@example.com',
        'subject' => 'Automated message',
        'message' => 'This automated message should never be stored.',
        'website' => 'https://spam.example.com',
    ])->assertSessionHasErrors('website');

    $this->assertDatabaseMissing('contacts', ['email' => 'bot@example.com']);
});

test('contact submissions are rate limited', function () {
    $submission = [
        'name' => 'Community Member',
        'email' => 'member@example.com',
        'subject' => 'Community enquiry',
        'message' => 'I would like more information about the association.',
        'website' => '',
    ];

    for ($attempt = 1; $attempt <= 5; $attempt++) {
        $this->withServerVariables(['REMOTE_ADDR' => '203.0.113.10'])
            ->post(route('contact.store'), $submission)
            ->assertRedirect(route('pages.contact'));
    }

    $this->withServerVariables(['REMOTE_ADDR' => '203.0.113.10'])
        ->post(route('contact.store'), $submission)
        ->assertTooManyRequests();

    $this->assertDatabaseCount('contacts', 5);
});

test('post slugs are normalized before uniqueness validation', function () {
    $this->actingAs(User::factory()->create());
    $category = Category::create(['title' => 'News', 'slug' => 'news']);

    $this->post(route('posts.store'), [
        'category_id' => $category->id,
        'title' => 'Community Update',
        'slug' => '  Community UPDATE!  ',
        'body' => 'This is a sufficiently detailed community update for testing.',
    ])->assertRedirect(route('posts.index'));

    $this->assertDatabaseHas('posts', ['slug' => 'community-update']);

    $this->post(route('posts.store'), [
        'category_id' => $category->id,
        'title' => 'Duplicate Community Update',
        'slug' => 'community---update',
        'body' => 'This is another sufficiently detailed community update.',
    ])->assertSessionHasErrors('slug');

    expect(Post::where('slug', 'community-update')->count())->toBe(1);
});

test('unsafe post HTML is removed while editor formatting is retained', function () {
    $this->actingAs(User::factory()->create());
    $category = Category::create(['title' => 'Security', 'slug' => 'security']);

    $this->post(route('posts.store'), [
        'category_id' => $category->id,
        'title' => 'Safe Post',
        'slug' => 'safe-post',
        'body' => '<h2>Community news</h2><p><strong>Safe formatted content remains available.</strong></p><script>alert(1)</script><a href="javascript:alert(2)" onclick="alert(3)">Unsafe link</a>',
    ])->assertRedirect(route('posts.index'));

    $body = Post::where('slug', 'safe-post')->value('body');

    expect($body)->toContain('<h2>Community news</h2>', '<strong>Safe formatted content remains available.</strong>')
        ->not->toContain('<script', 'javascript:', 'onclick');
});

test('unsafe event HTML is removed before storage', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('events.store'), [
        'title' => 'Safe Event',
        'slug' => 'safe-event',
        'description' => '<p onmouseover="alert(1)">Event details</p><img src="javascript:alert(2)"><script>alert(3)</script>',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
    ])->assertRedirect(route('events.index'));

    $description = Event::where('slug', 'safe-event')->value('description');

    expect($description)->toContain('<p>Event details</p>')
        ->not->toContain('<script', 'javascript:', 'onmouseover');
});

test('unsafe programme HTML is removed before storage', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('programmes.store'), [
        'title' => 'Safe Programme',
        'slug' => 'safe-programme',
        'description' => '<blockquote>Programme details</blockquote><iframe src="https://evil.example/video"></iframe><svg onload="alert(1)"></svg>',
        'date_of_event' => '2026-10-16 10:00:00',
    ])->assertRedirect(route('programmes.index'));

    $description = Programme::where('slug', 'safe-programme')->value('description');

    expect($description)->toContain('<blockquote>Programme details</blockquote>')
        ->not->toContain('<iframe', '<svg', 'onload', 'evil.example');
});

test('event dates are ordered and location may be omitted', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('events.store'), [
        'title' => 'Community Day',
        'slug' => 'Community Day',
        'description' => 'A public community event.',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 09:00:00',
    ])->assertSessionHasErrors('end_date');

    $this->post(route('events.store'), [
        'title' => 'Community Day',
        'slug' => 'Community Day',
        'description' => 'A public community event.',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
    ])->assertRedirect(route('events.index'));

    $this->assertDatabaseHas('events', ['slug' => 'community-day', 'location' => null]);
});

test('an event without an end date is stored as a one-day event', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('events.store'), [
        'title' => 'One Day Gathering',
        'slug' => 'one-day-gathering',
        'description' => 'A community gathering taking place on one day.',
        'start_date' => '2026-10-20 10:00:00',
    ])->assertRedirect(route('events.index'));

    $this->assertDatabaseHas('events', [
        'slug' => 'one-day-gathering',
        'end_date' => null,
    ]);

    $event = Event::where('slug', 'one-day-gathering')->firstOrFail();
    $event->update(['end_date' => '2026-10-21 10:00:00']);

    $this->put(route('events.update', $event), [
        'title' => $event->title,
        'slug' => $event->slug,
        'description' => $event->description,
        'start_date' => $event->start_date->toDateTimeString(),
    ])->assertRedirect(route('events.index'));

    expect($event->fresh()->end_date)->toBeNull();
});

test('event and programme galleries reject batches above the 60 image limit', function (string $routeName, array $attributes) {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route($routeName), [
        ...$attributes,
        'gallery' => array_map(
            fn (int $index) => UploadedFile::fake()->image("gallery-{$index}.jpg"),
            range(1, 61),
        ),
    ]);

    $response->assertSessionHasErrors('gallery');
})->with([
    'event' => ['events.store', [
        'title' => 'Large Event Gallery',
        'slug' => 'large-event-gallery',
        'description' => 'An event with too many gallery images.',
        'start_date' => '2026-10-20 10:00:00',
    ]],
    'programme' => ['programmes.store', [
        'title' => 'Large Programme Gallery',
        'slug' => 'large-programme-gallery',
        'description' => 'A programme with too many gallery images.',
        'date_of_event' => '2026-10-20 10:00:00',
    ]],
]);

test('an event can delete only images from its own gallery', function () {
    $this->actingAs(User::factory()->create());
    $event = Event::create([
        'title' => 'Community Day',
        'slug' => 'community-day',
        'description' => 'A public community event.',
        'start_date' => '2026-10-15 10:00:00',
        'end_date' => '2026-10-15 12:00:00',
        'gallery' => ['events/gallery/owned.jpg'],
    ]);

    $this->put(route('events.update', $event), [
        'title' => $event->title,
        'slug' => $event->slug,
        'description' => $event->description,
        'start_date' => $event->start_date->toDateTimeString(),
        'end_date' => $event->end_date->toDateTimeString(),
        'deletedImages' => ['events/gallery/not-owned.jpg'],
    ])->assertSessionHasErrors('deletedImages.0');
});

test('a programme can delete only images from its own gallery', function () {
    $this->actingAs(User::factory()->create());
    $programme = Programme::create([
        'title' => 'Mentoring',
        'slug' => 'mentoring',
        'description' => 'A mentoring programme.',
        'date_of_event' => '2026-10-16 10:00:00',
        'gallery' => ['programmes/gallery/owned.jpg'],
    ]);

    $this->put(route('programmes.update', $programme), [
        'title' => $programme->title,
        'slug' => $programme->slug,
        'description' => $programme->description,
        'date_of_event' => $programme->date_of_event->toDateTimeString(),
        'deletedImages' => ['programmes/gallery/not-owned.jpg'],
    ])->assertSessionHasErrors('deletedImages.0');
});
