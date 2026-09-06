import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Contact {
    id: number;
}

interface DashboardProps {
    unreadContacts: Contact[];
}

export default function Dashboard({ unreadContacts }: DashboardProps) {
    const user = usePage<SharedData>().props.auth.user;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <p className="text-lg text-gray-600">
                        Welcome <span className="font-head font-bold">{user.name}</span>!
                    </p>
                </div>
                <div>
                    There are <span className="rounded-full bg-red-600 p-2 text-sm font-bold text-white">{unreadContacts.length}</span> messages from
                    the contact form
                </div>
                <div className="mt-6">
                    <p className="font-bold">Quick Links</p>
                    <div>
                        <p className="translate-all duration-300 hover:translate-x-2">
                            {' >>'} <Link href="/dashboard/users/create">Create user</Link>
                        </p>
                        <p className="translate-all duration-300 hover:translate-x-2">
                            {' >>'} <Link href="/dashboard/users">All users</Link>
                        </p>
                        <p className="translate-all duration-300 hover:translate-x-2">
                            {' >>'} <Link href="/dashboard/contacts">View latest Message from contact form</Link>
                        </p>
                        <p className="translate-all duration-300 hover:translate-x-2">
                            {' >>'} <Link href="/dashboard/categories/create">Create category for blog post</Link>
                        </p>
                        <p className="translate-all duration-300 hover:translate-x-2">
                            {' >>'} <Link href="/dashboard/posts/create">Create blog post</Link>
                        </p>
                        <p className="translate-all duration-300 hover:translate-x-2">
                            {' >>'} <Link href="/dashboard/events/create">Create new event</Link>
                        </p>
                        <p className="translate-all duration-300 hover:translate-x-2">
                            {' >>'} <Link href="/dashboard/programmes/create">Create new programme</Link>
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
