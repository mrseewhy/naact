import { Link } from '@inertiajs/react';

const BusinessCTA = () => {
    return (
        <section className="font-body bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-green-50 lg:grid-cols-2">
                    <div className="min-h-72">
                        <img src="/images/nigerian-business.jpeg" alt="Nigerian Business Community" className="h-full min-h-72 w-full object-cover" />
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                        <div className="mb-5 h-1 w-14 rounded-full bg-green-700" />
                        <h2 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Discover Nigerian Businesses</h2>

                        <p className="mt-5 leading-7 text-gray-600">
                            Connect with trusted Nigerian-owned businesses across Canberra. From medical centres to supermarkets, fashion to financial
                            services, find everything you need in one place.
                        </p>

                        <Link
                            href="/businesses"
                            className="mt-8 inline-flex w-fit rounded-full bg-green-800 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        >
                            View Businesses
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessCTA;
