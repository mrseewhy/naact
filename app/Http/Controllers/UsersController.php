<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::latest()->paginate(20);

        return Inertia::render('admin/users/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('admin/users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:255|string|confirmed',
        ]);
        $validated['is_admin'] = true;

        try {
            DB::transaction(function () use ($validated) {
                $validated['password'] = Hash::make($validated['password']);
                User::create($validated);
            });

            return to_route('users.index')->with('success', 'User created successfully!');
        } catch (\Exception $e) {
            return to_route('users.index')->with('error', 'An error occurred while creating the user.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $user = User::findOrFail($id);

        return Inertia::render('admin/users/Edit', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validationRules = [
            'name' => 'required|min:3|max:255|string',
            'email' => 'required|email|unique:users,email,'.$id,
        ];

        if ($request->filled('password')) {
            $validationRules['password'] = 'required|min:8|max:255|string';
        }

        $validated = $request->validate($validationRules);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($validated['password']);
        }

        try {
            DB::transaction(function () use ($user, $validated) {
                $user->update($validated);
            });

            return to_route('users.index')->with('success', 'User updated successfully!');
        } catch (\Exception $e) {
            return to_route('users.index')->with('error', 'An error occurred while updating the user.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Check if there's only one user left
        if (User::count() <= 1) {
            return to_route('users.index')->with('error', 'Cannot delete the only user!');
        }

        // Check if trying to delete authenticated user
        if (Auth::id() === $user->id) {
            return to_route('users.index')->with('error', 'You cannot delete your own account!');
        }

        // Check if trying to delete default/admin user
        if ($user->id === 1) {
            return to_route('users.index')->with('error', 'Cannot delete the default admin user!');
        }

        try {
            DB::transaction(function () use ($user) {
                $user->delete();
            });

            return to_route('users.index')->with('success', 'User deleted successfully!');
        } catch (\Exception $e) {
            return to_route('users.index')->with('error', 'Error deleting user!');
        }
    }
}
