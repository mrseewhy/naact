<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('registration redirects to login', function () {
    $response = $this->get('/register');

    $response->assertRedirect('/login');
});

test('public registration submissions are rejected', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertMethodNotAllowed();
    $this->assertGuest();
    $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
});

test('the default admin is seeded only once', function () {
    $this->seed();
    $this->seed();

    $user = User::where('email', 'test@test.com')->firstOrFail();

    expect(User::where('email', 'test@test.com')->count())->toBe(1)
        ->and($user->name)->toBe('Default Admin')
        ->and($user->email_verified_at)->not->toBeNull()
        ->and(Hash::check('12345678', $user->password))->toBeTrue();
});

test('production seeding rejects the development admin credentials', function () {
    config(['app.env' => 'production']);

    expect(fn () => $this->seed())->toThrow(
        RuntimeException::class,
        'Set a unique ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters before production seeding.',
    );
});
