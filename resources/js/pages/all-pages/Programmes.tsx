import PageHeader from '@/components/mycomponents/PageHeader';
import { ReusablePagination } from '@/components/mycomponents/Pagination';
import Layout from '@/layouts/page-layout';
import { eventDateBadge, formatEventDateRange } from '@/lib/event-date';
import type { PaginatedData, Programme } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CalendarDays, Users } from 'lucide-react';

interface ProgrammesProps {
    upcomingProgrammes: PaginatedData<Programme>;
    pastProgrammes: PaginatedData<Programme>;
}

function cleanAndTruncate(html: string, limit: number) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}

function ProgrammeCard({ programme, past = false }: { programme: Programme; past?: boolean }) {
    const url: string = usePage().props.appUrl;
    const badge = eventDateBadge(programme.date_of_event);

    return (
        <Link
            href={route('programme.show', programme.slug)}
            className={`group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:outline-none ${past ? 'opacity-85' : ''}`}
        >
            <article>
                <div className="relative overflow-hidden">
                    <img
                        src={programme.image ? `${url}/storage/${programme.image}` : `${url}/images/programme-placeholder.png`}
                        alt={programme.image ? programme.title : ''}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 min-w-16 rounded-xl bg-white px-3 py-2 text-center shadow-lg">
                        <span className="block font-head text-2xl leading-none font-bold text-green-900">{badge.day}</span>
                        <span className="mt-1 block text-xs font-bold tracking-wider text-green-700">{badge.month}</span>
                    </div>
                    {past && (
                        <span className="absolute top-4 right-4 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-semibold text-white">
                            Past programme
                        </span>
                    )}
                </div>
                <div className="p-6">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
                        <CalendarDays className="size-4 shrink-0" />
                        {formatEventDateRange(programme.date_of_event, null)}
                    </p>
                    <h2 className="mb-3 font-head text-2xl font-bold text-green-950 transition group-hover:text-green-700">{programme.title}</h2>
                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">{cleanAndTruncate(programme.description, 180)}</p>
                    <span className="inline-flex items-center gap-2 font-head font-semibold text-green-800 group-hover:text-green-600">
                        View programme <ArrowRight className="size-4" />
                    </span>
                </div>
            </article>
        </Link>
    );
}

const Programmes = ({ upcomingProgrammes, pastProgrammes }: ProgrammesProps) => (
    <>
        <Head title="Programmes" />
        <PageHeader title="Programmes" />

        <section className="bg-white py-16">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-10 max-w-3xl">
                    <p className="mb-2 font-head text-sm font-bold tracking-widest text-green-700 uppercase">Learn, grow and connect</p>
                    <h1 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Upcoming Programmes</h1>
                    <p className="mt-3 leading-7 text-gray-600">
                        Explore initiatives designed to support, empower, and connect members of our community.
                    </p>
                </div>

                {upcomingProgrammes.data.length > 0 ? (
                    <>
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingProgrammes.data.map((programme) => (
                                <ProgrammeCard key={programme.id} programme={programme} />
                            ))}
                        </div>
                        {(upcomingProgrammes.last_page ?? 1) > 1 && (
                            <div className="mt-10">
                                <ReusablePagination data={upcomingProgrammes} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-2xl border border-dashed border-green-200 bg-white px-6 py-16 text-center">
                        <Users className="mx-auto mb-5 size-12 text-green-700" />
                        <h2 className="font-head text-2xl font-bold text-green-950">No upcoming programmes at the moment</h2>
                        <p className="mx-auto mt-3 max-w-xl text-gray-600">
                            New opportunities will appear here when they are announced. Learn more about NAACT in the meantime.
                        </p>
                        <Link
                            href="/about"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 font-head font-semibold text-white hover:bg-green-700"
                        >
                            About NAACT <ArrowRight className="size-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>

        {pastProgrammes.data.length > 0 && (
            <section className="border-t border-gray-100 bg-white py-16">
                <div className="container mx-auto max-w-7xl px-4">
                    <p className="mb-2 font-head text-sm font-bold tracking-widest text-green-700 uppercase">Our work in action</p>
                    <h2 className="mb-10 font-head text-3xl font-bold text-green-950 md:text-4xl">Past Programmes</h2>
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {pastProgrammes.data.map((programme) => (
                            <ProgrammeCard key={programme.id} programme={programme} past />
                        ))}
                    </div>
                    {(pastProgrammes.last_page ?? 1) > 1 && (
                        <div className="mt-10">
                            <ReusablePagination data={pastProgrammes} />
                        </div>
                    )}
                </div>
            </section>
        )}
    </>
);

Programmes.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Programmes;
