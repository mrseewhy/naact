import { ReusablePagination } from '@/components/mycomponents/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type Programme } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ProgrammesTable } from './ProgrammesTable';

interface IndexProps {
    programmes: PaginatedData<Programme>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Programmes',
        href: '/dashboard/programmes',
    },
];

export default function Index({ programmes }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programmes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/programmes/create" className="cursor-pointer">
                        <Button variant={'mine'}>+ Create new programme</Button>
                    </Link>
                </div>
                <div>
                    <ProgrammesTable programmes={programmes} />
                </div>
                {programmes.data.length > 0 && (
                    <div>
                        <ReusablePagination data={programmes} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
