import type { Programme } from '@/types';
import { Link, usePage } from '@inertiajs/react';

function cleanAndTruncate(html: string, limit: number) {
    const text = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > limit ? text.slice(0, limit) + '...' : text;
}

interface ProgrammesSectionProps {
    programmes: Programme[];
}

export default function ProgrammesSection({ programmes }: ProgrammesSectionProps) {
    const url: string = usePage().props.appUrl;
    return (
        <section className="border-y border-gray-100 bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-4 h-1 w-14 rounded-full bg-green-700" />
                        <h2 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Our Programmes</h2>
                    </div>
                    <Link href="/programmes" className="font-head font-semibold text-green-800 hover:text-green-600 hover:underline">
                        View All Programmes →
                    </Link>
                </div>

                {programmes && programmes.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {programmes.map((programme) => (
                            <article
                                key={programme.id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                            >
                                {programme.image ? (
                                    <img src={`${url}/storage/${programme.image}`} alt={programme.title} className="h-48 w-full object-cover" />
                                ) : (
                                    <img src={`${url}/images/programme-placeholder.png`} alt="" className="h-48 w-full object-cover" />
                                )}
                                <div className="p-6">
                                    <h3 className="mb-3 font-head text-xl font-bold text-green-950">{programme.title}</h3>
                                    <p className="mb-4 text-sm leading-6 text-gray-600">{cleanAndTruncate(programme.description, 100)}</p>
                                    <Link
                                        href={route('programme.show', programme.slug)}
                                        className="text-sm font-semibold text-green-700 hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 px-6 py-12 text-center text-gray-600">
                        Programme information will be available here soon.
                    </div>
                )}
            </div>
        </section>
    );
}
