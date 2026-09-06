import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

interface Category {
    id: number;
    title: string;
    // Add other category properties as needed
}

type CategoryFormData = {
    title: string;
};

interface EditCategoryProps {
    category: Category;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Category',
        href: '/dashboard/categories',
    },
];

export default function Edit({ category }: EditCategoryProps) {
    const { data, setData, put, processing, errors, clearErrors, reset } = useForm<CategoryFormData>({
        title: category.title,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('categories.update', category.id), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                toast.error('An error occurred while updating the category.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/categories" className="cursor-pointer">
                        <Button variant={'mine'}>{'<<'} Back to all categories</Button>
                    </Link>
                </div>

                <div className="max-w-xl">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={(e) => {
                                    setData('title', e.target.value);
                                    if (errors.title) {
                                        clearErrors('title');
                                    }
                                }}
                            />
                            {errors.title && <span className="text-sm text-red-600">{errors.title}</span>}
                        </div>

                        <div>
                            <Button variant={'mine'} className="w-full" disabled={processing}>
                                {processing ? 'Updating' : 'Update Category'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
