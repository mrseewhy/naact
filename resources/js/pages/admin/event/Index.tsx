import { ReusablePagination } from '@/components/mycomponents/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EventTable } from './EventTable';

interface Event {
    id: number;
    title: string;
    description: string;
    image: string | null;
    slug: string;
}

interface EventsData {
    data: Event[];
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

interface IndexProps {
    events: EventsData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/dashboard/events',
    },
];

export default function Index({ events }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/events/create" className="cursor-pointer">
                        <Button variant={'mine'}>+ Create new event</Button>
                    </Link>
                </div>
                <div>
                    <EventTable events={events} />
                </div>
                <div>{events.data && events.data.length > 0 && <ReusablePagination data={events} />}</div>
            </div>
        </AppLayout>
    );
}
