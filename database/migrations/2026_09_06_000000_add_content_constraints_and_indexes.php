<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['title', 'slug'] as $column) {
            $hasDuplicates = DB::table('categories')
                ->select($column)
                ->groupBy($column)
                ->havingRaw('COUNT(*) > 1')
                ->exists();

            if ($hasDuplicates) {
                throw new \RuntimeException("Duplicate category {$column} values must be resolved before this migration can run.");
            }
        }

        Schema::table('users', fn (Blueprint $table) => $table->index('created_at'));
        Schema::table('contacts', function (Blueprint $table) {
            $table->index('created_at');
            $table->index(['read', 'created_at']);
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->unique('title');
            $table->unique('slug');
            $table->index('created_at');
        });
        Schema::table('posts', function (Blueprint $table) {
            $table->index('category_id');
            $table->index('created_at');
        });
        Schema::table('events', function (Blueprint $table) {
            $table->index('start_date');
            $table->index('created_at');
        });
        Schema::table('programmes', function (Blueprint $table) {
            $table->index('date_of_event');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::table('programmes', function (Blueprint $table) {
            $table->dropIndex(['date_of_event']);
            $table->dropIndex(['created_at']);
        });
        Schema::table('events', function (Blueprint $table) {
            $table->dropIndex(['start_date']);
            $table->dropIndex(['created_at']);
        });
        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex(['category_id']);
            $table->dropIndex(['created_at']);
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->dropUnique(['title']);
            $table->dropUnique(['slug']);
            $table->dropIndex(['created_at']);
        });
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['read', 'created_at']);
        });
        Schema::table('users', fn (Blueprint $table) => $table->dropIndex(['created_at']));
    }
};
