import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { Head } from '@inertiajs/react';
import { Banknote, Building2, CheckCircle, Heart } from 'lucide-react';

const Donate = () => {
    return (
        <>
            <Head title="Donate" />
            <PageHeader title={'Donate'} />
            <section className="bg-white py-16">
                <div className="container mx-auto max-w-7xl space-y-16 px-4">
                    {/* Support Our Mission Section */}
                    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                        <img src="/images/support.webp" alt="Support Our Mission" className="h-auto w-full rounded-xl object-cover shadow-md" />
                        <div>
                            <h1 className="mb-4 font-head text-3xl font-bold text-green-800">Support Our Mission</h1>
                            <p className="mb-4 text-gray-700">
                                The Nigerian Association in the Australian Capital Territory (NAACT) relies on the generosity of individuals and
                                organisations to continue serving our community. Your donation helps us organise cultural events, support new
                                migrants, run youth programs, and advocate for a stronger Nigerian voice in Australia.
                            </p>
                            <p className="text-gray-700">
                                Whether it’s a one-time gift or a regular contribution, every donation goes directly towards building a vibrant,
                                inclusive, and supportive community.
                            </p>
                        </div>
                    </div>

                    {/* Where Your Donation Goes */}
                    <div>
                        <h2 className="mb-6 font-head text-2xl font-semibold text-green-800">Where Your Donation Goes</h2>
                        <ul className="space-y-3 text-gray-700">
                            {[
                                'Hosting cultural events and festivals',
                                'Supporting community welfare initiatives',
                                'Empowering youth through education and mentorship',
                                'Providing resources for new migrants',
                                'Strengthening advocacy and representation',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ways to Give */}
                    <div>
                        <h2 className="mb-6 font-head text-2xl font-semibold text-green-800">Ways to Give</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <Heart className="mb-3 h-6 w-6 text-green-700" />
                                <h3 className="mb-2 font-head text-lg font-semibold text-green-800">Online Donation</h3>
                                <p className="text-sm text-gray-600">Make a secure payment via credit/debit card.</p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <Banknote className="mb-3 h-6 w-6 text-green-700" />
                                <h3 className="mb-2 font-head text-lg font-semibold text-green-800">Bank Transfer</h3>
                                <p className="text-sm text-gray-600">
                                    Account Name: NAACT Inc. <br />
                                    BSB: 123-456 <br />
                                    Account Number: 12345678
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <Building2 className="mb-3 h-6 w-6 text-green-700" />
                                <h3 className="mb-2 font-head text-lg font-semibold text-green-800">Corporate Giving</h3>
                                <p className="text-sm text-gray-600">Partner with us as a sponsor or community donor.</p>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-gray-600">
                            NAACT is a registered non-profit. All donations go towards community initiatives and are deeply appreciated.
                        </p>
                    </div>

                    {/* Thank You Section */}
                    <div className="rounded-md border-l-4 border-green-800 bg-green-50 p-6 shadow-sm">
                        <h3 className="mb-2 font-head text-xl font-semibold text-green-800">Thank You</h3>
                        <p className="text-gray-700">
                            Your generosity helps us preserve our culture, support our people, and build a legacy for future generations. Together, we
                            make a difference.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

Donate.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Donate;
