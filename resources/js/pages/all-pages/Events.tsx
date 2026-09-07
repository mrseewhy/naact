import PageHeader from '@/components/mycomponents/PageHeader';
import { ReusablePagination } from '@/components/mycomponents/Pagination';
import Layout from '@/layouts/page-layout';
import { eventDateBadge, formatEventDateRange } from '@/lib/event-date';
import { type Event, type PaginatedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';

interface EventsProps {
    upcomingEvents: PaginatedData<Event>;
    pastEvents: PaginatedData<Event>;
}

function cleanAndTruncate(html: string, limit: number) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}

function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
    const url: string = usePage().props.appUrl;
    const badge = eventDateBadge(event.start_date);
    const eventUrl = route('event.show', event.slug);

    return (
        <Link
            href={eventUrl}
            className={`group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:outline-none ${past ? 'opacity-85' : ''}`}
        >
            <article>
                <div className="relative overflow-hidden">
                    <img
                        src={event.image ? `${url}/storage/${event.image}` : `${url}/images/event-placeholder.png`}
                        alt={event.image ? event.title : ''}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 min-w-16 rounded-xl bg-white px-3 py-2 text-center shadow-lg">
                        <span className="block font-head text-2xl leading-none font-bold text-green-900">{badge.day}</span>
                        <span className="mt-1 block text-xs font-bold tracking-wider text-green-700">{badge.month}</span>
                    </div>
                    {past && (
                        <span className="absolute top-4 right-4 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-semibold text-white">
                            Past event
                        </span>
                    )}
                </div>

                <div className="p-6">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
                        <CalendarDays className="size-4 shrink-0" />
                        {formatEventDateRange(event.start_date, event.end_date)}
                    </p>
                    <h2 className="mb-3 font-head text-2xl font-bold text-green-950 transition group-hover:text-green-700">{event.title}</h2>
                    {event.location && (
                        <p className="mb-4 flex items-start gap-2 text-sm text-gray-600">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-green-700" />
                            <span>{event.location}</span>
                        </p>
                    )}
                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">{cleanAndTruncate(event.description, 180)}</p>
                    <span className="inline-flex items-center gap-2 font-head font-semibold text-green-800 group-hover:text-green-600">
                        View event <ArrowRight className="size-4" />
                    </span>
                </div>
            </article>
        </Link>
    );
}

const Events = ({ upcomingEvents, pastEvents }: EventsProps) => (
    <>
        <Head title="Events" />
        <PageHeader title="Events" />

        {(upcomingEvents.data.length > 0 || pastEvents.data.length === 0) && (
            <section className="bg-white py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="mb-10 max-w-3xl">
                        <p className="mb-2 font-head text-sm font-bold tracking-widest text-green-700 uppercase">Connect with the community</p>
                        <h1 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Upcoming Events</h1>
                        <p className="mt-3 leading-7 text-gray-600">
                            Discover gatherings, celebrations, and opportunities to connect with the NAACT community.
                        </p>
                    </div>

                    {upcomingEvents.data.length > 0 ? (
                        <>
                            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                                {upcomingEvents.data.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                            {(upcomingEvents.last_page ?? 1) > 1 && (
                                <div className="mt-10">
                                    <ReusablePagination data={upcomingEvents} />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-white px-6 py-16 text-center">
                            <CalendarDays className="mx-auto mb-5 size-12 text-green-700" />
                            <h2 className="font-head text-2xl font-bold text-green-950">No upcoming events at the moment</h2>
                            <p className="mx-auto mt-3 max-w-xl text-gray-600">
                                New events will appear here as soon as they are announced. In the meantime, explore more about our community.
                            </p>
                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 font-head font-semibold text-white hover:bg-green-700"
                            >
                                Return home <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        )}

        {pastEvents.data.length > 0 && (
            <section className="bg-white py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <p className="mb-2 font-head text-sm font-bold tracking-widest text-green-700 uppercase">From our community</p>
                    <h2 className="mb-10 font-head text-3xl font-bold text-green-950 md:text-4xl">Past Events</h2>
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {pastEvents.data.map((event) => (
                            <EventCard key={event.id} event={event} past />
                        ))}
                    </div>
                    {(pastEvents.last_page ?? 1) > 1 && (
                        <div className="mt-10">
                            <ReusablePagination data={pastEvents} />
                        </div>
                    )}
                </div>
            </section>
        )}
    </>
);

Events.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Events;
