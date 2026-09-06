import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { formatEventDateRange } from '@/lib/event-date';
import type { Programme } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ShowProgrammeProps {
    programme: Programme;
}

const ShowProgramme = ({ programme }: ShowProgrammeProps) => {
    const url: string = usePage().props.appUrl;
    const programmeHasPassed = new Date(programme.date_of_event) < new Date(new Date().setHours(0, 0, 0, 0));
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setLightboxOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const selectedImage = programme.gallery?.[currentIndex] ? `${url}/storage/${programme.gallery[currentIndex]}` : null;

    return (
        <>
            <Head title={programme.title} />
            <PageHeader title="Programme Details" />
            <div className="bg-white py-6">
                <div className="container mx-auto max-w-7xl px-4">
                    <Link href="/programmes" className="inline-block text-green-700 hover:underline">
                        ← Back to Programmes
                    </Link>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-16">
                <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
                    <img
                        src={programme.image ? `${url}/storage/${programme.image}` : `${url}/images/programme-placeholder.png`}
                        alt={programme.image ? programme.title : ''}
                        className="h-80 w-full object-cover md:h-[30rem]"
                    />
                    <div className="p-6 md:p-10">
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <h1 className="font-head text-3xl font-bold text-green-950 md:text-4xl">{programme.title}</h1>
                            {programmeHasPassed && (
                                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-700 uppercase">Past programme</span>
                            )}
                        </div>

                        <div className="mb-8 max-w-xl rounded-2xl bg-green-50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-green-800 p-2 text-white">
                                    <CalendarDays className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-wider text-green-700 uppercase">Programme date</p>
                                    <p className="mt-1 font-head font-semibold text-green-950">
                                        {formatEventDateRange(programme.date_of_event, null)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rich-content py-4" dangerouslySetInnerHTML={{ __html: programme.description }} />

                        {programme.gallery && programme.gallery.length > 0 && (
                            <section className="mt-10" aria-labelledby="programme-gallery-heading">
                                <h2 id="programme-gallery-heading" className="mb-5 font-head text-2xl font-bold text-green-950">
                                    Programme Gallery
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {programme.gallery.map((image, index) => (
                                        <button
                                            type="button"
                                            key={image}
                                            className="overflow-hidden rounded-lg border bg-white focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                                            onClick={() => {
                                                setCurrentIndex(index);
                                                setLightboxOpen(true);
                                            }}
                                            aria-label={`Open gallery image ${index + 1} of ${programme.gallery!.length}`}
                                        >
                                            <img
                                                src={`${url}/storage/${image}`}
                                                alt=""
                                                className="h-40 w-full object-cover transition duration-300 hover:scale-105"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </article>
            </div>

            {lightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setLightboxOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${programme.title} image gallery`}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-6 right-6 text-white hover:text-red-400"
                        aria-label="Close image gallery"
                    >
                        <X className="size-8" />
                    </button>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            setCurrentIndex((currentIndex - 1 + programme.gallery!.length) % programme.gallery!.length);
                        }}
                        className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:text-green-400"
                        aria-label="Previous gallery image"
                    >
                        <ChevronLeft className="size-10" />
                    </button>
                    <img
                        src={selectedImage}
                        alt={`${programme.title} gallery image ${currentIndex + 1}`}
                        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                        onClick={(event) => event.stopPropagation()}
                    />
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            setCurrentIndex((currentIndex + 1) % programme.gallery!.length);
                        }}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-green-400"
                        aria-label="Next gallery image"
                    >
                        <ChevronRight className="size-10" />
                    </button>
                </div>
            )}
        </>
    );
};

ShowProgramme.layout = (page: React.ReactNode) => <Layout children={page} />;
export default ShowProgramme;
