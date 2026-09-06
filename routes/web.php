<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProgrammeController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PagesController::class, 'home'])->name('home');
Route::get('/about', [PagesController::class, 'about'])->name('pages.about');
Route::get('/businesses', [PagesController::class, 'businesses'])->name('pages.businesses');
Route::get('/programmes', [PagesController::class, 'programmes'])->name('pages.programmes');
Route::get('/events', [PagesController::class, 'events'])->name('pages.events');
Route::get('/blog', [PagesController::class, 'blog'])->name('pages.blog');
Route::get('/contact', [PagesController::class, 'contact'])->name('pages.contact');
Route::get('/donate', [PagesController::class, 'donate'])->name('pages.donate');
Route::get('/get-involved', [PagesController::class, 'getInvolved'])->name('pages.get-involved');
Route::get('/privacy-policy', [PagesController::class, 'privacyPolicy'])->name('pages.privacy-policy');
Route::get('/terms', [PagesController::class, 'terms'])->name('pages.terms');
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');
Route::get('/blog/{post}', [PagesController::class, 'showBlog'])->name('blog.show');
Route::get('/events/{event}', [PagesController::class, 'showEvent'])->name('event.show');
Route::get('/programmes/{programme}', [PagesController::class, 'showProgramme'])->name('programme.show');
Route::get('/register', function () {
    return redirect('/login');
})->name('register');

Route::middleware(['auth', 'can:access-admin'])->prefix('dashboard')->group(function () {
    Route::get('/', function () {
        $unreadContacts = App\Models\Contact::where('read', 0)->get();

        return Inertia::render('dashboard', ['unreadContacts' => $unreadContacts]);
    })->name('dashboard');

    Route::resource('users', UsersController::class)
        ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
        ->names('users');
    Route::get('contacts', [ContactController::class, 'index'])->name('contact.index');
    Route::put('contacts/{contact}/mark-as-read', [ContactController::class, 'markAsRead'])->name('contacts.mark-as-read');
    Route::resource('categories', CategoryController::class)
        ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
        ->names('categories');
    Route::resource('posts', PostController::class)
        ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
        ->names('posts');
    Route::resource('events', EventController::class)
        ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
        ->names('events');
    Route::resource('programmes', ProgrammeController::class)
        ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
        ->names('programmes');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
