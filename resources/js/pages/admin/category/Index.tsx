import { ReusablePagination } from '@/components/mycomponents/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CategoryTable } from './CategoryTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/dashboard/categories',
    },
];

// Define the Category interface
interface Category {
    id: number;
    title: string;
    // Add other category properties as needed
}

// Define the PaginationLink interface (adjust if needed)
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Define the categories prop structure with pagination
interface CategoriesData {
    data: Category[];
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    links?: PaginationLink[];
    // Add other pagination meta properties as needed
}

// Define the component props
interface CategoryIndexProps {
    categories: CategoriesData;
}

export default function Index({ categories }: CategoryIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/categories/create" className="cursor-pointer">
                        <Button variant="mine">+ Create new category</Button>
                    </Link>
                </div>

                <div>
                    <CategoryTable categories={categories} />
                </div>

                {categories.data.length > 0 && (
                    <div className="mt-4">
                        <ReusablePagination data={categories} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
