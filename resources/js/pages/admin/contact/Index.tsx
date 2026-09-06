import { ReusablePagination } from '@/components/mycomponents/Pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    read: boolean;
}

interface ContactsData {
    data: Contact[];
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

interface ContactProps {
    contacts: ContactsData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contact',
        href: '/dashboard/contacts',
    },
];

export default function Contact({ contacts }: ContactProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [readStatus, setReadStatus] = useState<boolean[]>(contacts?.data.map((c: Contact) => Boolean(c.read)) || []);

    const markAsRead = (index: number, contactId: number): void => {
        if (readStatus[index]) return;

        const updatedStatus = [...readStatus];
        updatedStatus[index] = true;
        setReadStatus(updatedStatus);

        router.put(
            route('contacts.mark-as-read', contactId),
            {},
            {
                preserveScroll: true,
                onError: () => {
                    updatedStatus[index] = false;
                    setReadStatus(updatedStatus);
                    toast.error('Sorry, an error occurred!');
                },
            },
        );
    };

    const handleOverlayClick = (index: number, contactId: number): void => {
        setOpenIndex(index);
        markAsRead(index, contactId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Details" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h3 className="font-head text-xl font-medium">Messages From Contact Form</h3>
                </div>

                {!contacts?.data || contacts.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="text-center">
                            <p className="text-lg text-gray-600">No contact messages yet</p>
                            <p className="mt-2 text-sm text-gray-500">
                                Contact messages will appear here once they are submitted through the contact form.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {contacts.data.map((contact: Contact, index: number) => {
                            const isOpen = openIndex === index;
                            const isRead = readStatus[index];

                            return (
                                <div key={contact.id} className="relative w-full overflow-hidden rounded-xl border border-gray-300 shadow-sm">
                                    {!isRead && (
                                        <div
                                            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-white/60 backdrop-blur-sm"
                                            onClick={() => handleOverlayClick(index, contact.id)}
                                        >
                                            <span className="rounded-full bg-green-800 px-4 py-1 text-sm font-semibold text-white">Unread</span>
                                        </div>
                                    )}

                                    <div className="bg-gray-200 px-4 py-4 text-black">
                                        <p className="mb-2 text-xs text-gray-700">
                                            {new Date(contact.created_at).toLocaleString('en-GB', {
                                                timeZone: 'Australia/Canberra',
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                        <div
                                            className="flex cursor-pointer items-center justify-between"
                                            onClick={() => {
                                                setOpenIndex(isOpen ? null : index);
                                            }}
                                        >
                                            <div className="grid w-full grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-sm">Sender's Name:</p>
                                                    <p className="font-semibold">{contact.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">Sender's Email:</p>
                                                    <p className="text-sm font-semibold">{contact.email}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-sm">Subject Line</p>
                                                    <p className="text-sm font-semibold">{contact.subject}</p>
                                                </div>
                                            </div>
                                            <div className="ml-4 text-gray-700">{isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</div>
                                        </div>
                                    </div>

                                    {isOpen && (
                                        <div className="border-t border-gray-200 bg-white px-4 py-3 break-words">
                                            <p className="text-gray-700">{contact.message}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {contacts?.data && contacts.data.length > 0 && (
                    <div>
                        <ReusablePagination data={contacts} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
