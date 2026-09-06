import type { Post } from '@/types';
import { Link, usePage } from '@inertiajs/react';

function cleanAndTruncate(html: string, limit: number) {
    const text = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > limit ? text.slice(0, limit) + '...' : text;
}
interface BlogSectionProps {
    posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
    const url: string = usePage().props.appUrl;
    return (
        <section className="border-y border-gray-100 bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-4 h-1 w-14 rounded-full bg-green-700" />
                        <h2 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Latest Blog Posts</h2>
                    </div>
                    <Link href="/blog" className="font-head font-semibold text-green-800 hover:text-green-600 hover:underline">
                        Read More Articles →
                    </Link>
                </div>

                {posts && posts.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                            >
                                <div className="relative">
                                    {post.image ? (
                                        <img src={`${url}/storage/${post.image}`} alt={post.title} className="h-48 w-full object-cover" />
                                    ) : (
                                        <img src={`${url}/images/blog-placeholder.png`} alt="" className="h-48 w-full object-cover" />
                                    )}
                                    <span className="absolute top-3 left-3 rounded-full bg-green-800 px-3 py-1 text-sm font-semibold text-white shadow-md">
                                        {post.category.title}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-3 font-head text-xl font-bold text-green-950">{post.title}</h3>
                                    <p className="text-sm leading-6 text-gray-600">{cleanAndTruncate(post.body, 100)}</p>
                                    <Link
                                        href={route('blog.show', post.slug)}
                                        className="mt-4 inline-flex text-sm font-semibold text-green-700 hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 px-6 py-12 text-center text-gray-600">
                        New articles will be available here soon.
                    </div>
                )}
            </div>
        </section>
    );
}
