import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import type { Post } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarDays, FolderOpen } from 'lucide-react';

interface ShowPostProps {
    post: Post;
}

const publishedDate = new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

const ShowPost = ({ post }: ShowPostProps) => {
    const url: string = usePage().props.appUrl;

    return (
        <>
            <Head title={post.title} />
            <PageHeader title="Article" />
            <div className="bg-white py-6">
                <div className="container mx-auto max-w-7xl px-4">
                    <Link href="/blog" className="inline-block text-green-700 hover:underline">
                        ← Back to Blog
                    </Link>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-16">
                <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
                    <img
                        src={post.image ? `${url}/storage/${post.image}` : `${url}/images/blog-placeholder.png`}
                        alt={post.image ? post.title : ''}
                        className="h-80 w-full object-cover md:h-[30rem]"
                    />
                    <div className="p-6 md:p-10">
                        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-green-700">
                            <span className="inline-flex items-center gap-2">
                                <FolderOpen className="size-4" />
                                {post.category.title}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CalendarDays className="size-4" />
                                {publishedDate.format(new Date(post.created_at))}
                            </span>
                        </div>
                        <h1 className="mb-8 max-w-4xl font-head text-3xl font-bold text-green-950 md:text-5xl md:leading-tight">{post.title}</h1>
                        <div className="rich-content border-t border-gray-100 pt-8" dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>
                </article>
            </div>
        </>
    );
};

ShowPost.layout = (page: React.ReactNode) => <Layout children={page} />;
export default ShowPost;
