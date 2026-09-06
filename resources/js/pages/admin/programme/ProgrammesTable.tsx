import DeleteModal from '@/components/mycomponents/DeleteModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { PaginatedData, Programme } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface ProgrammesTableProps {
    programmes: PaginatedData<Programme>;
}

function cleanAndTruncate(html: string, limit: number) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
}

export function ProgrammesTable({ programmes }: ProgrammesTableProps) {
    const url = usePage().props.appUrl;
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [programmeToDelete, setProgrammeToDelete] = useState<Programme | null>(null);
    const whatToDelete = 'programme';
    const [titleToDelete, setTitleToDelete] = useState<string | null>(null);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);

    return (
        <>
            {programmes.data.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead className="max-w-xs">Title</TableHead>
                            <TableHead className="max-w-xs">Details</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>View Post</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {programmes.data.map((programme, index) => (
                            <TableRow key={programme.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="max-w-xs break-all whitespace-normal">{programme.title}</TableCell>
                                <TableCell className="max-w-xs break-all whitespace-normal">{cleanAndTruncate(programme.description, 200)}</TableCell>
                                <TableCell>
                                    {programme.image ? (
                                        <img src={`${url}/storage/${programme.image}`} alt="Post Image" className="h-16 w-16 rounded object-cover" />
                                    ) : (
                                        'No Image'
                                    )}
                                </TableCell>
                                <TableCell>
                                    <a href={`/programmes/${programme.slug}`} target="_blank" className="underline">
                                        View Post
                                    </a>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-4">
                                        <Link href={route('programmes.edit', { slug: programme.slug })}>
                                            <span className="text-green-600">Edit</span>
                                        </Link>
                                        <span className="text-sm font-bold text-red-600">
                                            <button
                                                onClick={() => {
                                                    setProgrammeToDelete(programme);
                                                    setShowDeleteModal(true);
                                                    setTitleToDelete(programme.title);
                                                    setIdToDelete(programme.id);
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
            ) : (
                <div className="mt-8 py-4 text-center text-lg text-gray-500">
                    <p>No available programmes, new programmes will appear here.</p>
                </div>
            )}
            <DeleteModal
                whatToDelete={whatToDelete}
                data={programmeToDelete}
                isOpen={showDeleteModal}
                titleToDelete={titleToDelete}
                onClose={() => setShowDeleteModal(false)}
                idToDelete={idToDelete}
            />
        </>
    );
}
