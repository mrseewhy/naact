import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';

interface ReusablePaginationProps {
    data: PaginatedData<unknown>;
}

export function ReusablePagination({ data }: ReusablePaginationProps) {
    if (!data || !data.links) {
        return null;
    }

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(
                url,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                {data.links.map((link, index) => {
                    // Previous button
                    if (link.label === '&laquo; Previous') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(link.url);
                                    }}
                                    className={!link.url ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        );
                    }

                    // Next button
                    if (link.label === 'Next &raquo;') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(link.url);
                                    }}
                                    className={!link.url ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        );
                    }

                    // Ellipsis
                    if (link.label === '...') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    // Page numbers
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(link.url);
                                }}
                                isActive={link.active}
                                className="cursor-pointer"
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
