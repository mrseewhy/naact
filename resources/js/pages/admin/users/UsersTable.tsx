import DeleteModal from '@/components/mycomponents/DeleteModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UsersData {
    data: User[];

    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

interface UsersTableProps {
    users: UsersData;
}

export function UsersTable({ users }: UsersTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    // Check if users exist and have data
    if (!users?.data || users.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg text-gray-600">No users yet</p>
                    <p className="mt-2 text-sm text-gray-500">Users will appear here once they are added to the system.</p>
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
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.data.map((user: User, index: number) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">
                                <div>
                                    <span className="mr-4 text-sm font-bold text-green-600">
                                        <Link href={route('users.edit', { id: user.id })}>Edit</Link>
                                    </span>
                                    <span className="text-sm font-bold text-red-600">
                                        <button
                                            onClick={() => {
                                                setUserToDelete(user);
                                                setShowDeleteModal(true);
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
                    whatToDelete="user"
                    isOpen={showDeleteModal}
                    titleToDelete={userToDelete?.name}
                    onClose={() => setShowDeleteModal(false)}
                    idToDelete={userToDelete?.id}
                />
            )}
        </>
    );
}
