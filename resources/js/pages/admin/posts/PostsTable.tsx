import DeleteModal from '@/components/mycomponents/DeleteModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function cleanAndTruncate(html: string, limit: number) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
}

interface Post {
    id: number;
    title: string;
    body: string;
    image: string | null;
    slug: string;
}

interface PostsData {
    data: Post[];
}

interface PostTableProps {
    posts: PostsData;
}

export function PostTable({ posts }: PostTableProps) {
    const url = usePage().props.appUrl;
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const whatToDelete = 'post';
    const [titleToDelete, setTitleToDelete] = useState<string | null>(null);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);

    if (!posts?.data || posts.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg text-gray-600">No available post, new posts will appear here</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">S/N</TableHead>
                        <TableHead className="max-w-xs">Title</TableHead>
                        <TableHead className="max-w-xs">Body</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>View Post</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.data.map((post, index) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell className="max-w-xs break-all whitespace-normal">{post.title}</TableCell>
                            <TableCell className="max-w-xs break-all whitespace-normal">{cleanAndTruncate(post.body, 200)}</TableCell>
                            <TableCell>
                                {post.image ? (
                                    <img src={`${url}/storage/${post.image}`} alt="Post Image" className="h-16 w-16 rounded object-cover" />
                                ) : (
                                    'No Image'
                                )}
                            </TableCell>
                            <TableCell>
                                <a href={`/blog/${post.slug}`} target="_blank" className="underline">
                                    View Post
                                </a>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-4">
                                    <Link href={route('posts.edit', { slug: post.slug })}>
                                        <span className="text-green-600">Edit</span>
                                    </Link>
                                    <span className="text-sm font-bold text-red-600">
                                        <button
                                            onClick={() => {
                                                setPostToDelete(post);
                                                setShowDeleteModal(true);
                                                setTitleToDelete(post.title);
                                                setIdToDelete(post.id);
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {showDeleteModal && (
                <DeleteModal
                    whatToDelete={whatToDelete}
                    data={postToDelete}
                    isOpen={showDeleteModal}
                    titleToDelete={titleToDelete}
                    onClose={() => setShowDeleteModal(false)}
                    idToDelete={idToDelete}
                />
            )}
        </>
    );
}
