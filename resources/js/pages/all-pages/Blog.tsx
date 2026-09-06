import PageHeader from '@/components/mycomponents/PageHeader';
import { ReusablePagination } from '@/components/mycomponents/Pagination';
import Layout from '@/layouts/page-layout';
import type { PaginatedData, Post } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BookOpen, CalendarDays } from 'lucide-react';

interface BlogProps {
    blogPosts: PaginatedData<Post>;
}

function cleanAndTruncate(html: string, limit: number) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}

const publishedDate = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

function BlogCard({ post }: { post: Post }) {
    const url: string = usePage().props.appUrl;

    return (
        <Link
            href={route('blog.show', post.slug)}
            className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
            <article>
                <div className="relative overflow-hidden">
                    <img
                        src={post.image ? `${url}/storage/${post.image}` : `${url}/images/blog-placeholder.png`}
                        alt={post.image ? post.title : ''}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-green-800 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-lg">
                        {post.category.title}
                    </span>
                </div>
                <div className="p-6">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
                        <CalendarDays className="size-4 shrink-0" />
                        {publishedDate.format(new Date(post.created_at))}
                    </p>
                    <h2 className="mb-3 font-head text-2xl font-bold text-green-950 transition group-hover:text-green-700">{post.title}</h2>
                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">{cleanAndTruncate(post.body, 180)}</p>
                    <span className="inline-flex items-center gap-2 font-head font-semibold text-green-800 group-hover:text-green-600">
                        Read article <ArrowRight className="size-4" />
                    </span>
                </div>
            </article>
        </Link>
    );
}

const Blog = ({ blogPosts }: BlogProps) => (
    <>
        <Head title="Blog" />
        <PageHeader title="Blog" />
        <section className="bg-white py-16">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-10 max-w-3xl">
                    <p className="mb-2 font-head text-sm font-bold tracking-widest text-green-700 uppercase">Stories and updates</p>
                    <h1 className="font-head text-3xl font-bold text-green-950 md:text-4xl">From Our Community</h1>
                    <p className="mt-3 leading-7 text-gray-600">
                        Read the latest news, perspectives, and stories from NAACT and the community we serve.
                    </p>
                </div>

                {blogPosts.data.length > 0 ? (
                    <>
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {blogPosts.data.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                        {(blogPosts.last_page ?? 1) > 1 && (
                            <div className="mt-10">
                                <ReusablePagination data={blogPosts} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-2xl border border-dashed border-green-200 bg-white px-6 py-16 text-center">
                        <BookOpen className="mx-auto mb-5 size-12 text-green-700" />
                        <h2 className="font-head text-2xl font-bold text-green-950">No articles have been published yet</h2>
                        <p className="mx-auto mt-3 max-w-xl text-gray-600">
                            Community news and stories will appear here as soon as they are available.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 font-head font-semibold text-white hover:bg-green-700"
                        >
                            Return home <ArrowRight className="size-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    </>
);

Blog.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Blog;
