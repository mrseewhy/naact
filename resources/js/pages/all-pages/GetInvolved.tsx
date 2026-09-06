import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { Head } from '@inertiajs/react';
import { BadgeCheck, ClipboardList, Lightbulb, Users } from 'lucide-react';

const GetInvolved = () => {
    return (
        <>
            <Head title="Get Involved" />
            <PageHeader title={'Get Involved'} />
            <section className="bg-white py-16">
                <div className="container mx-auto max-w-7xl space-y-16 px-4">
                    {/* Intro Section */}
                    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                        <div>
                            <h1 className="mb-4 font-head text-3xl font-bold text-green-800">Be Part of Something Bigger</h1>
                            <p className="mb-4 text-gray-700">
                                NAACT is powered by the energy, passion, and contributions of everyday people just like you. Whether you’re looking to
                                give back, stay connected to your roots, or make new friends, there’s a place for you here.
                            </p>
                        </div>
                        <img src="/images/part.jpg" alt="Get Involved" className="h-auto w-full rounded-xl object-cover shadow-md" />
                    </div>

                    {/* Ways to Get Involved */}
                    <div>
                        <h2 className="mb-6 text-center font-head text-2xl font-semibold text-green-800">Ways to Get Involved</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <Users className="mb-3 h-6 w-6 text-green-700" />
                                <h3 className="mb-2 font-head text-lg font-semibold text-green-800">Volunteer</h3>
                                <p className="text-sm text-gray-600">
                                    Help organise events, support logistics, or contribute your skills in media, admin, hospitality, and more.
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <ClipboardList className="mb-3 h-6 w-6 text-green-700" />
                                <h3 className="mb-2 font-head text-lg font-semibold text-green-800">Join a Committee</h3>
                                <p className="text-sm text-gray-600">
                                    Play a role in shaping the future by joining committees like Events, Youth, Welfare, etc.
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <BadgeCheck className="mb-3 h-6 w-6 text-green-700" />
                                <h3 className="mb-2 font-head text-lg font-semibold text-green-800">Become a Member</h3>
                                <p className="text-sm text-gray-600">Stay informed, enjoy exclusive benefits, and vote in association decisions.</p>
                            </div>
                            <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <Lightbulb className="mb-3 h-6 w-6 text-green-700" />
                                <h3 className="mb-2 font-head text-lg font-semibold text-green-800">Share Your Expertise</h3>
                                <p className="text-sm text-gray-600">
                                    Run a workshop, mentor youth, or offer professional support in your area of experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Why It Matters */}
                    <div className="rounded-md border-l-4 border-green-800 bg-green-50 p-6 shadow-sm">
                        <h3 className="mb-2 font-head text-xl font-semibold text-green-800">Why It Matters</h3>
                        <p className="mb-2 text-gray-700">
                            When you get involved, you help create a stronger, more connected Nigerian community in the ACT. Every helping hand
                            strengthens our culture, our support systems, and our collective voice.
                        </p>
                        <p className="text-gray-700">
                            Whether you have a few hours a month or just a passion to contribute, there’s a role for you in NAACT.
                        </p>
                    </div>

                    {/* CTA: Let’s Build Together */}
                    <div className="mt-10 text-center">
                        <h3 className="mb-4 font-head text-2xl font-bold text-green-800">Let’s Build Together</h3>
                        <p className="mx-auto mb-4 max-w-2xl text-gray-700">
                            Interested in getting involved?{' '}
                            <span className="font-semibold text-green-700">
                                Email us at <a href="mailto:info@naact.org.au">info@naact.org.au</a>
                            </span>{' '}
                            — we’d love to hear from you.
                        </p>
                        {/* Optional button or form can go here */}
                    </div>
                </div>
            </section>
        </>
    );
};

GetInvolved.layout = (page: React.ReactNode) => <Layout children={page} />;
export default GetInvolved;
