import { ReusablePagination } from '@/components/mycomponents/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type Post } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PostTable } from './PostsTable';

type PostsData = PaginatedData<Post>;

interface IndexProps {
    posts: PostsData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/dashboard/posts',
    },
];

export default function Index({ posts }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/posts/create" className="cursor-pointer">
                        <Button variant={'mine'}>+ Create new post</Button>
                    </Link>
                </div>
                <div>
                    <PostTable posts={posts} />
                </div>
                <div>{posts.data && posts.data.length > 0 && <ReusablePagination data={posts} />}</div>
            </div>
        </AppLayout>
    );
}
