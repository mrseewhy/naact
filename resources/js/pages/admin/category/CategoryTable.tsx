import DeleteModal from '@/components/mycomponents/DeleteModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Category {
    id: number;
    title: string;
}

interface CategoriesData {
    data: Category[];
}

interface CategoryTableProps {
    categories: CategoriesData;
}

export function CategoryTable({ categories }: CategoryTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    // Check if categories exist and have data
    if (!categories?.data || categories.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg text-gray-600">No categories yet</p>
                    <p className="mt-2 text-sm text-gray-500">Categories will appear here once they are added to the system.</p>
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
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.data.map((category: Category, index: number) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{category.title}</TableCell>
                            <TableCell className="text-right">
                                <div>
                                    <span className="mr-4 text-sm font-bold text-green-600">
                                        <Link href={route('categories.edit', { id: category.id })}>Edit</Link>
                                    </span>
                                    <span className="text-sm font-bold text-red-600">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCategoryToDelete(category);
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
                    whatToDelete="category"
                    isOpen={showDeleteModal}
                    titleToDelete={categoryToDelete?.title}
                    onClose={() => setShowDeleteModal(false)}
                    idToDelete={categoryToDelete?.id}
                />
            )}
        </>
    );
}
