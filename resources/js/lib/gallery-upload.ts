export const IMAGE_ACCEPT = '.jpg,.jpeg,.png,.gif,.webp';
export const MAX_GALLERY_IMAGES = 60;
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

export function addGalleryFiles(current: File[], selected: File[]): { files: File[]; error?: string } {
    if (current.length + selected.length > MAX_GALLERY_IMAGES) {
        return { files: current, error: `A gallery can contain no more than ${MAX_GALLERY_IMAGES} images.` };
    }

    const unsupported = selected.find((file) => !allowedImageTypes.has(file.type));
    if (unsupported) {
        return { files: current, error: `${unsupported.name} is not a JPG, PNG, GIF, or WebP image.` };
    }

    const oversized = selected.find((file) => file.size > MAX_IMAGE_BYTES);
    if (oversized) {
        return { files: current, error: `${oversized.name} is larger than the 2 MB limit.` };
    }

    return { files: [...current, ...selected] };
}
