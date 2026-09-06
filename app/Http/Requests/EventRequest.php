<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesContentImages;
use App\Models\Event;
use App\Support\RichTextSanitizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class EventRequest extends FormRequest
{
    use ValidatesContentImages;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug((string) $this->input('slug')),
            'description' => app(RichTextSanitizer::class)->sanitize((string) $this->input('description')),
        ]);
    }

    public function rules(): array
    {
        $event = $this->route('event');
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('events', 'slug')->ignore($event instanceof Event ? $event->id : null)],
            'description' => ['required', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after:start_date'],
            'location' => ['nullable', 'string', 'max:255'],
            'image' => $this->featuredImageRules(),
            ...$this->galleryImageRules(),
        ];

        if ($event instanceof Event) {
            $rules = [...$rules, ...$this->deletedGalleryRules($event->gallery ?? [])];
        }

        return $rules;
    }
}
