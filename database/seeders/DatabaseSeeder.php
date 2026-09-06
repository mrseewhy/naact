<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $name = (string) config('admin.name');
        $email = (string) config('admin.email');
        $password = (string) config('admin.password');

        if (config('app.env') === 'production'
            && ($email === 'test@test.com' || $password === '12345678' || strlen($password) < 12)) {
            throw new \RuntimeException('Set a unique ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters before production seeding.');
        }

        User::firstOrCreate([
            'email' => $email,
        ], [
            'name' => $name,
            'email_verified_at' => now(),
            'is_admin' => true,
            'password' => bcrypt($password),
        ]);
    }
}
