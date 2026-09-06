import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Category',
        href: '/dashboard/categories',
    },
];

// Define the form data structure
type CategoryFormData = {
    title: string;
};

export default function Create() {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm<CategoryFormData>({
        title: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                toast.error('An error occurred while creating the category.');
            },
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData('title', e.target.value);
        if (errors.title) {
            clearErrors('title');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/categories" className="cursor-pointer">
                        <Button variant="mine">{'<<'} Back to all categories</Button>
                    </Link>
                </div>

                <div className="max-w-xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" type="text" value={data.title} onChange={handleChange} />
                            {errors.title && <span className="text-sm text-red-600">{errors.title}</span>}
                        </div>

                        <div>
                            <Button type="submit" variant="mine" className="w-full" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Category'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
