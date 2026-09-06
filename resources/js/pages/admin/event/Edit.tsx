import RichTextEditor from '@/components/admin/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { slugify } from '@/lib/slugify';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string | null;
    location: string;
    image: string | null;
    gallery: string[];
}

interface EditProps {
    event: Event;
}

type EventFormData = {
    _method: string;
    title: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    image: File | null;
    gallery: File[];
    deletedImages: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Event',
        href: '/dashboard/events',
    },
];

export default function Edit({ event }: EditProps) {
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

    const handleDeleteImage = (image: string) => {
        setImagesToDelete([...imagesToDelete, image]);
    };

    const { data, setData, errors, clearErrors, post, processing, reset } = useForm<EventFormData>({
        _method: 'put',
        title: event.title,
        slug: event.slug,
        description: event.description,
        start_date: event.start_date ? event.start_date.split('T')[0] : '',
        end_date: event.end_date ? event.end_date.split('T')[0] : '',
        location: event.location,
        image: null,
        gallery: [],
        deletedImages: [],
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('events.update', event.slug), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                toast.error('An error occurred while creating the category.');
            },
        });
    };

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            deletedImages: imagesToDelete,
        }));
    }, [imagesToDelete, setData]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Event" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/events" className="cursor-pointer">
                        <Button variant={'mine'}>{'<<'} Back to all events</Button>
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
                            <Label htmlFor="start_date">Start Date</Label>
                            <Input
                                id="start_date"
                                type="date"
                                name="start_date"
                                value={data.start_date}
                                onChange={(e) => {
                                    setData('start_date', e.target.value);
                                    if (errors.start_date) {
                                        clearErrors('start_date');
                                    }
                                }}
                            />
                            {errors.start_date && <span className="text-sm text-red-600">{errors.start_date}</span>}
                        </div>

                        {/* End Date */}
                        <div>
                            <Label htmlFor="end_date">End Date (optional)</Label>
                            <Input
                                id="end_date"
                                type="date"
                                name="end_date"
                                value={data.end_date}
                                onChange={(e) => {
                                    setData('end_date', e.target.value);
                                    if (errors.end_date) {
                                        clearErrors('end_date');
                                    }
                                }}
                            />
                            <p className="mt-1 text-sm text-muted-foreground">Leave blank for a one-day event.</p>
                            {errors.end_date && <span className="text-sm text-red-600">{errors.end_date}</span>}
                        </div>

                        {/* Location */}
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={data.location}
                                onChange={(e) => {
                                    setData('location', e.target.value);
                                    if (errors.location) {
                                        clearErrors('location');
                                    }
                                }}
                                placeholder="Event venue or address"
                            />
                            {errors.location && <span className="text-sm text-red-600">{errors.location}</span>}
                        </div>

                        {/* Featured Image Upload */}
                        <div>
                            <Label htmlFor="image">Featured Image</Label>
                            {event.image ? (
                                !data.image && (
                                    <div className="py-4">
                                        <p className="text-sm">previous Image</p>
                                        <img
                                            src={`/storage/${event.image}`}
                                            alt="Existing featured image"
                                            className="h-24 w-24 rounded object-cover"
                                        />
                                    </div>
                                )
                            ) : (
                                <p className="py-4">No Image</p>
                            )}
                            <Input
                                id="image"
                                type="file"
                                name="image"
                                accept="image/*"
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

                            {event.gallery && event.gallery.length > 0 ? (
                                <div className="mb-4 grid grid-cols-1 gap-4 py-4 sm:grid-cols-3 lg:grid-cols-6">
                                    {event.gallery
                                        .filter((image) => !imagesToDelete.includes(image))
                                        .map((image, index) => (
                                            <div key={index} className="relative rounded-lg border bg-gray-50">
                                                <img
                                                    src={`/storage/${image}`}
                                                    alt={`Existing gallery image ${index + 1}`}
                                                    className="h-24 w-full rounded object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(image)}
                                                    className="absolute top-2 right-2 rounded bg-red-500 p-1 text-xs text-white transition-colors hover:bg-red-600"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="py-4">No Gallery Images</p>
                            )}
                            <Input
                                id="gallery"
                                type="file"
                                name="gallery"
                                accept="image/*"
                                multiple
                                className="file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-blue-800 file:px-4 file:py-1 file:text-white hover:file:bg-blue-700"
                                onChange={(e) => {
                                    const files = Array.from(e.target.files ?? []);
                                    // Combine existing gallery images with new ones
                                    const existingGallery = data.gallery || [];
                                    const combinedGallery = [...existingGallery, ...files];

                                    setData('gallery', combinedGallery);
                                    if (errors.gallery) {
                                        clearErrors('gallery');
                                    }
                                    // Clear the input to allow selecting the same files again
                                    e.target.value = '';
                                }}
                            />
                            <p className="mt-1 text-sm text-gray-600">Select multiple images for the event gallery</p>
                            {errors.gallery && <span className="text-sm text-red-600">{errors.gallery}</span>}
                            {errors.gallery && (
                                <span className="text-sm text-red-600">
                                    {Array.isArray(errors.gallery)
                                        ? errors.gallery.map((error, index) => <div key={index}>{error}</div>)
                                        : errors.gallery}
                                </span>
                            )}

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
                                {processing ? 'Updating Event...' : 'Update Event'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
