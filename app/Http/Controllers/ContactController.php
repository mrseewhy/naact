<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactStoreRequest;
use App\Models\Contact;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $contacts = Contact::latest()->paginate(20);

        return Inertia::render('admin/contact/Index', ['contacts' => $contacts]);
    }

    public function store(ContactStoreRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            Contact::create($validated);
        });

        return to_route('pages.contact')->with('success', 'Congratulations, Your message has been sent!');
    }

    public function markAsRead(Contact $contact)
    {
        try {
            DB::transaction(function () use ($contact) {
                $contact->update(['read' => true]);
            });

            return to_route('contact.index')->with('success', 'Message marked as read.');
        } catch (\Exception $e) {
            return to_route('contact.index')->with('error', 'An error occurred while marking the message as read.');
        }
    }
}
