import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { formatEventDateRange } from '@/lib/event-date';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type EventData = {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    description: string;
    location: string;
    start_date: string;
    end_date: string | null;
    created_at: string;
    gallery?: string[];
};

interface ShowEventProps {
    event: EventData;
}

const ShowEvent = ({ event }: ShowEventProps) => {
    const url: string = usePage().props.appUrl;
    const eventHasPassed = new Date(event.end_date ?? event.start_date) < new Date(new Date().setHours(0, 0, 0, 0));

    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const showPrev = () => {
        if (event.gallery && event.gallery.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + event.gallery!.length) % event.gallery!.length);
        }
    };

    const showNext = () => {
        if (event.gallery && event.gallery.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % event.gallery!.length);
        }
    };

    const selectedImage = event.gallery?.[currentIndex] ? `${url}/storage/${event.gallery[currentIndex]}` : null;

    return (
        <>
            <Head title={event.title} />
            <PageHeader title="Event Details" />

            <div className="bg-white py-6">
                <div className="container mx-auto max-w-7xl px-4">
                    <Link href="/events" className="inline-block text-green-700 hover:underline">
                        ← Back to Events
                    </Link>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-16">
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="relative">
                        {event.image ? (
                            <img src={`${url}/storage/${event.image}`} alt={event.title} className="h-96 w-full object-cover object-top" />
                        ) : (
                            <img src={`${url}/images/event-placeholder.png`} alt="" className="h-96 w-full object-cover" />
                        )}
                    </div>

                    <div className="p-8">
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <h1 className="font-head text-3xl font-bold text-green-950 md:text-4xl">{event.title}</h1>
                            {eventHasPassed && (
                                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-700 uppercase">Past event</span>
                            )}
                        </div>

                        <div className="mb-8 grid gap-4 rounded-2xl bg-green-50 p-5 sm:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-green-800 p-2 text-white">
                                    <Calendar className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-wider text-green-700 uppercase">Date</p>
                                    <p className="mt-1 font-head font-semibold text-green-950">
                                        {formatEventDateRange(event.start_date, event.end_date)}
                                    </p>
                                </div>
                            </div>
                            {event.location && (
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-green-800 p-2 text-white">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold tracking-wider text-green-700 uppercase">Location</p>
                                        <p className="mt-1 font-head font-semibold text-green-950">{event.location}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rich-content break-after-auto py-4" dangerouslySetInnerHTML={{ __html: event.description }} />

                        {event.gallery && event.gallery.length > 0 && (
                            <div className="mt-4 mb-4 grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
                                {event.gallery.map((image, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        className="relative overflow-hidden rounded-lg border bg-white focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                                        onClick={() => openLightbox(index)}
                                        aria-label={`Open gallery image ${index + 1} of ${event.gallery!.length}`}
                                    >
                                        <img
                                            src={`${url}/storage/${image}`}
                                            alt={`Gallery image ${index + 1}`}
                                            className="h-40 w-full rounded object-cover transition-transform duration-200 hover:scale-105"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${event.title} image gallery`}
                >
                    <button onClick={closeLightbox} className="absolute top-6 right-6 text-white hover:text-red-500" aria-label="Close image gallery">
                        <X className="h-8 w-8" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:text-green-500"
                        aria-label="Previous gallery image"
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </button>

                    <img
                        src={selectedImage}
                        alt={`${event.title} gallery image ${currentIndex + 1}`}
                        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-green-500"
                        aria-label="Next gallery image"
                    >
                        <ChevronRight className="h-10 w-10" />
                    </button>
                </div>
            )}
        </>
    );
};

ShowEvent.layout = (page: React.ReactNode) => <Layout children={page} />;
export default ShowEvent;
