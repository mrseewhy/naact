// import { ReusablePagination } from '@/components/mycomponents/Pagination';
// import { Button } from '@/components/ui/button';
// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head, Link } from '@inertiajs/react';
// import { UsersTable } from './UsersTable';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Users',
//         href: '/dashboard/users',
//     },
// ];

// export default function Index({ users }) {
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Dashboard" />
//             <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
//                 <div>
//                     <Link href="/dashboard/users/create" className="cursor-pointer">
//                         <Button variant={'mine'}>+ Create new user</Button>
//                     </Link>
//                 </div>
//                 <div>
//                     <UsersTable users={users} />
//                 </div>
//                 <div>
//                     <ReusablePagination data={users} />
//                 </div>
//             </div>
//         </AppLayout>
//     );
// }

import { ReusablePagination } from '@/components/mycomponents/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { UsersTable } from './UsersTable';

// Define the User type
interface User {
    id: number;
    name: string;
    email: string;
    // Add other user properties as needed
}

// Define the users prop structure
interface UsersData {
    data: User[];
    // Add other pagination properties as needed
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    // Add other properties that your pagination component expects
}

interface IndexProps {
    users: UsersData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/dashboard/users',
    },
];

export default function Index({ users }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/users/create" className="cursor-pointer">
                        <Button variant={'mine'}>+ Create new user</Button>
                    </Link>
                </div>
                <div>
                    <UsersTable users={users} />
                </div>
                <div>{users.data && users.data.length > 0 && <ReusablePagination data={users} />}</div>
            </div>
        </AppLayout>
    );
}
