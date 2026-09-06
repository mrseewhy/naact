<?php

namespace App\Http\Requests\Concerns;

use Illuminate\Validation\Rule;

trait ValidatesContentImages
{
    protected function featuredImageRules(): array
    {
        return ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'];
    }

    protected function galleryImageRules(): array
    {
        return [
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ];
    }

    protected function deletedGalleryRules(array $gallery): array
    {
        return [
            'deletedImages' => ['nullable', 'array'],
            'deletedImages.*' => ['string', Rule::in($gallery)],
        ];
    }
}
