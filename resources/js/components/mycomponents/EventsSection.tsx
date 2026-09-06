import { formatEventDateRange } from '@/lib/event-date';
import type { Event } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';

function cleanAndTruncate(html: string, limit: number) {
    const text = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

    return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

interface EventsSectionProps {
    events: Event[];
}

export default function EventsSection({ events }: EventsSectionProps) {
    const url: string = usePage().props.appUrl;

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-4 h-1 w-14 rounded-full bg-green-700" />
                        <h2 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Latest Events</h2>
                    </div>
                    <Link href="/events" className="font-head font-semibold text-green-800 hover:text-green-600 hover:underline">
                        View More Events →
                    </Link>
                </div>

                {events && events.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <article
                                key={event.id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                            >
                                <img
                                    src={event.image ? `${url}/storage/${event.image}` : `${url}/images/event-placeholder.png`}
                                    alt={event.image ? event.title : ''}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-6">
                                    <div className="mb-3 flex items-start gap-2 text-sm font-medium text-green-700">
                                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span>{formatEventDateRange(event.start_date, event.end_date)}</span>
                                    </div>
                                    <h3 className="font-head text-xl font-bold text-green-950">{event.title}</h3>
                                    {event.location && (
                                        <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                    <p className="mt-4 text-sm leading-6 text-gray-600">{cleanAndTruncate(event.description, 125)}</p>
                                    <Link
                                        href={route('event.show', event.slug)}
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"
                                    >
                                        Read More <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 px-6 py-12 text-center text-gray-600">
                        New event information will be available here soon.
                    </div>
                )}
            </div>
        </section>
    );
}
