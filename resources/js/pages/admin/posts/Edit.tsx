import RichTextEditor from '@/components/admin/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { slugify } from '@/lib/slugify';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

interface Post {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    body: string;
    image: string | null;
}

interface Category {
    id: number;
    title: string;
}

interface EditProps {
    post: Post;
    categories: Category[];
}

type PostFormData = {
    _method: string;
    category_id: string;
    title: string;
    slug: string;
    body: string;
    image: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Post',
        href: '/dashboard/posts/edit',
    },
];

export default function Edit({ post, categories }: EditProps) {
    const url = usePage().props.appUrl;
    const {
        data,
        setData,
        errors,
        clearErrors,
        post: submitForm,
        processing,
        reset,
    } = useForm<PostFormData>({
        _method: 'put',
        category_id: String(post.category_id),
        title: post.title,
        slug: post.slug,
        body: post.body,
        image: null,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitForm(route('posts.update', post.slug), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                toast.error('An error occurred while updating the post.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/posts" className="cursor-pointer">
                        <Button variant={'mine'}>{'<<'} Back to all posts</Button>
                    </Link>
                </div>

                <div className="max-w-4xl">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Category Dropdown */}
                        <div>
                            <Label htmlFor="category_id">Category</Label>
                            <Select
                                value={data.category_id?.toString()}
                                onValueChange={(value) => {
                                    setData('category_id', value);
                                    if (errors.category_id) {
                                        clearErrors('category_id');
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <span className="text-sm text-red-600">{errors.category_id}</span>}
                        </div>

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

                        {/* Body */}
                        <div className={`${errors.body ? '' : 'mb-16'} flex flex-col space-y-2`}>
                            <Label htmlFor="body">Body</Label>

                            <RichTextEditor
                                value={data.body}
                                onChange={(value) => {
                                    setData('body', value);
                                    if (errors.body) {
                                        clearErrors('body');
                                    }
                                }}
                            />
                            {errors.body && <span className="mt-10 text-sm text-red-600">{errors.body}</span>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label htmlFor="image">Featured Image</Label>

                            {/* Display current image if exists */}
                            {post.image ? (
                                <div className="mb-3">
                                    <p className="mb-2 text-sm text-gray-600">Current image:</p>
                                    <div className="h-24 w-24 overflow-hidden rounded-lg border border-gray-300">
                                        <img src={`${url}/storage/${post.image}`} alt="Post Image" className="h-24 w-24 rounded object-cover" />
                                    </div>
                                </div>
                            ) : (
                                <p className="py-4">No Available Image</p>
                            )}
                            <p className="text-sm font-semibold text-gray-600">Change Image</p>
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
                        </div>

                        {/* Submit Button */}
                        <div className="">
                            <Button variant={'mine'} className="w-full" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Post'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
