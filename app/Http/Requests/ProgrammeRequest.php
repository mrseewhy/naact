<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesContentImages;
use App\Models\Programme;
use App\Support\RichTextSanitizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProgrammeRequest extends FormRequest
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
        $programme = $this->route('programme');
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('programmes', 'slug')->ignore($programme instanceof Programme ? $programme->id : null)],
            'description' => ['required', 'string'],
            'date_of_event' => ['required', 'date'],
            'image' => $this->featuredImageRules(),
            ...$this->galleryImageRules(),
        ];

        if ($programme instanceof Programme) {
            $rules = [...$rules, ...$this->deletedGalleryRules($programme->gallery ?? [])];
        }

        return $rules;
    }
}
