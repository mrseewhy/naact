import RichTextEditor from '@/components/admin/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { addGalleryFiles, IMAGE_ACCEPT, MAX_GALLERY_IMAGES } from '@/lib/gallery-upload';
import { slugify } from '@/lib/slugify';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Programme',
        href: '/dashboard/programme',
    },
];

type ProgrammeFormData = {
    title: string;
    slug: string;
    description: string;
    date_of_event: string;
    image: File | null;
    gallery: File[];
};

export default function Create() {
    const { data, setData, errors, clearErrors, post, processing, reset } = useForm<ProgrammeFormData>({
        title: '',
        slug: '',
        description: '',
        date_of_event: '',

        image: null,
        gallery: [],
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('programmes.store'), {
            onSuccess: () => {
                reset();
            },
            onError: (formErrors) => {
                toast.error(Object.values(formErrors)[0] ?? 'The programme could not be created.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Programme" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/programmes" className="cursor-pointer">
                        <Button variant={'mine'}>{'<<'} Back to all programmes</Button>
                    </Link>
                </div>

                <div className="max-w-4xl">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Title */}
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={(e) => {
                                    const newTitle = e.target.value;
                                    setData('title', newTitle);

                                    // Auto-generate slug from title
                                    const newSlug = slugify(newTitle);
                                    setData('slug', newSlug);

                                    if (errors.title) {
                                        clearErrors('title');
                                    }
                                    if (errors.slug) {
                                        clearErrors('slug');
                                    }
                                }}
                            />
                            {errors.title && <span className="text-sm text-red-600">{errors.title}</span>}
                        </div>

                        {/* Slug */}
                        <div>
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                type="text"
                                name="slug"
                                value={data.slug}
                                onChange={(e) => {
                                    setData('slug', e.target.value);
                                    if (errors.slug) {
                                        clearErrors('slug');
                                    }
                                }}
                                placeholder="url-friendly-slug"
                            />
                            {errors.slug && <span className="text-sm text-red-600">{errors.slug}</span>}
                        </div>

                        {/* Description */}
                        <div className={`${errors.description ? '' : 'mb-16'} flex flex-col space-y-2`}>
                            <Label htmlFor="description">Description</Label>
                            <RichTextEditor
                                value={data.description}
                                onChange={(value) => {
                                    setData('description', value);
                                    if (errors.description) {
                                        clearErrors('description');
                                    }
                                }}
                            />
                            {errors.description && <span className="mt-10 text-sm text-red-600">{errors.description}</span>}
                        </div>

                        {/* Start Date */}
                        <div>
                            <Label htmlFor="date_of_event">Date of Programme</Label>
                            <Input
                                id="date_of_event"
                                type="date"
                                name="date_of_event"
                                value={data.date_of_event}
                                onChange={(e) => {
                                    setData('date_of_event', e.target.value);
                                    if (errors.date_of_event) {
                                        clearErrors('date_of_event');
                                    }
                                }}
                            />
                            {errors.date_of_event && <span className="text-sm text-red-600">{errors.date_of_event}</span>}
                        </div>

                        {/* Featured Image Upload */}
                        <div>
                            <Label htmlFor="image">Featured Image</Label>
                            <Input
                                id="image"
                                type="file"
                                name="image"
                                accept={IMAGE_ACCEPT}
                                className="file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-green-800 file:px-4 file:py-1 file:text-white hover:file:bg-green-700"
                                onChange={(e) => {
                                    setData('image', e.target.files?.[0] ?? null);
                                    if (errors.image) {
                                        clearErrors('image');
                                    }
                                }}
                            />
                            {errors.image && <span className="text-sm text-red-600">{errors.image}</span>}

                            {/* Featured Image Preview */}
                            {data.image && (
                                <div className="mt-4">
                                    <p className="mb-2 text-sm font-medium">Featured Image Preview</p>
                                    <div className="max-w-sm rounded-lg border bg-gray-50 p-3">
                                        <img
                                            src={URL.createObjectURL(data.image)}
                                            alt="Featured image preview"
                                            className="mb-2 h-32 w-full rounded object-cover"
                                        />
                                        <p className="mb-2 truncate text-sm text-gray-700" title={data.image.name}>
                                            {data.image.name}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('image', null);
                                                if (errors.image) {
                                                    clearErrors('image');
                                                }
                                            }}
                                            className="w-full rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Gallery Upload */}
                        <div>
                            <Label htmlFor="gallery">Gallery Images</Label>
                            <Input
                                id="gallery"
                                type="file"
                                name="gallery"
                                accept={IMAGE_ACCEPT}
                                multiple
                                className="file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-blue-800 file:px-4 file:py-1 file:text-white hover:file:bg-blue-700"
                                onChange={(e) => {
                                    const files = Array.from(e.target.files ?? []);
                                    const selection = addGalleryFiles(data.gallery, files);
                                    if (selection.error) {
                                        toast.error(selection.error);
                                    } else {
                                        setData('gallery', selection.files);
                                    }
                                    if (errors.gallery) {
                                        clearErrors('gallery');
                                    }
                                    // Clear the input to allow selecting the same files again
                                    e.target.value = '';
                                }}
                            />
                            <p className="mt-1 text-sm text-gray-600">Up to {MAX_GALLERY_IMAGES} JPG, PNG, GIF, or WebP images; maximum 2 MB each.</p>
                            {errors.gallery && <span className="text-sm text-red-600">{errors.gallery}</span>}

                            {/* Gallery Preview */}
                            {data.gallery && data.gallery.length > 0 && (
                                <div className="mt-4">
                                    <p className="mb-2 text-sm font-medium">Selected Images ({data.gallery.length})</p>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        {Array.from(data.gallery).map((file, index) => (
                                            <div key={index} className="rounded-lg border bg-gray-50 p-3">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Gallery preview ${index + 1}`}
                                                    className="mb-2 h-24 w-full rounded object-cover"
                                                />
                                                <p className="mb-2 truncate text-sm text-gray-700" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newGallery = Array.from(data.gallery).filter((_, i) => i !== index);
                                                        setData('gallery', newGallery);
                                                    }}
                                                    className="w-full rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="">
                            <Button variant={'mine'} className="w-full" disabled={processing}>
                                {processing ? 'Creating Programme...' : 'Create Programme'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
