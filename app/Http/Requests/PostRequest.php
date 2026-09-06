<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesContentImages;
use App\Models\Post;
use App\Support\RichTextSanitizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
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
            'body' => app(RichTextSanitizer::class)->sanitize((string) $this->input('body')),
        ]);
    }

    public function rules(): array
    {
        $post = $this->route('post');

        return [
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('posts', 'slug')->ignore($post instanceof Post ? $post->id : null)],
            'body' => ['required', 'string', 'min:30'],
            'image' => $this->featuredImageRules(),
        ];
    }
}
