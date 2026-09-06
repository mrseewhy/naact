<?php

namespace App\Support;

use Closure;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Throwable;

/**
 * Stores new public files before commit, removes them on database failure,
 * and removes superseded files only after the database commit succeeds.
 */
class PublicFileTransaction
{
    /** @var array<int, string> */
    private array $newFiles = [];

    /** @var array<int, string> */
    private array $obsoleteFiles = [];

    public function store(UploadedFile $file, string $directory, ?string $filename = null): string
    {
        $path = $filename
            ? $file->storeAs($directory, $filename, 'public')
            : $file->store($directory, 'public');

        if (! is_string($path)) {
            throw new RuntimeException('The uploaded file could not be stored.');
        }

        $this->newFiles[] = $path;

        return $path;
    }

    public function removeAfterCommit(?string $path): void
    {
        if ($path) {
            $this->obsoleteFiles[] = $path;
        }
    }

    public function replace(UploadedFile $file, string $directory, ?string $oldPath, ?string $filename = null): string
    {
        $path = $this->store($file, $directory, $filename);
        $this->removeAfterCommit($oldPath);

        return $path;
    }

    /**
     * @param  array<int, string>  $existing
     * @param  array<int, UploadedFile>  $uploads
     * @param  array<int, string>  $deleted
     * @return array<int, string>
     */
    public function syncGallery(array $existing, array $uploads, array $deleted, string $directory, Closure $filename): array
    {
        foreach ($deleted as $path) {
            $this->removeAfterCommit($path);
        }

        $gallery = array_values(array_diff($existing, $deleted));
        foreach ($uploads as $index => $file) {
            $gallery[] = $this->store($file, $directory, $filename($file, $index));
        }

        return $gallery;
    }

    public function run(Closure $operation): mixed
    {
        try {
            $result = DB::transaction($operation);
        } catch (Throwable $exception) {
            Storage::disk('public')->delete($this->newFiles);

            throw $exception;
        }

        Storage::disk('public')->delete(array_values(array_unique($this->obsoleteFiles)));

        return $result;
    }
}
