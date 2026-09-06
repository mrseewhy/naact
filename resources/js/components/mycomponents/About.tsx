import { Link } from '@inertiajs/react';

export default function AboutSection() {
    return (
        <section className="overflow-hidden bg-white py-16 md:py-20">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
                <div className="relative h-full w-full pr-4 pb-6 md:pr-8">
                    <div className="relative h-80 w-full sm:h-[28rem]">
                        <img
                            src="/images/ab11.jpg"
                            alt="About NAACT"
                            className="absolute top-0 left-0 h-[78%] w-4/5 rounded-2xl object-cover shadow-lg"
                        />
                        <img
                            src="/images/ab2.jpg"
                            alt="NAACT Work"
                            className="absolute right-0 bottom-0 h-[58%] w-2/3 rounded-2xl border-8 border-white object-cover shadow-xl"
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-5 h-1 w-14 rounded-full bg-green-700" />
                    <h2 className="mb-6 font-head text-3xl font-bold text-green-950 md:text-4xl">Who We Are</h2>
                    <p className="mb-8 leading-8 text-gray-700">
                        The Nigerian Association in the Australian Capital Territory (NAACT) is a vibrant, non-profit community organisation
                        established to serve, represent, and unite Nigerians living in Canberra and surrounding areas. <br />
                        Rooted in the values of unity, cultural pride, and mutual support, the association acts as a central hub for Nigerians of all
                        ages and backgrounds—offering a sense of belonging while fostering active participation in Australian society.
                        <br />
                        Through events, outreach programs, and advocacy efforts, we preserve our cultural heritage while helping members navigate life
                        in a new environment.
                    </p>

                    <Link
                        href="/about"
                        className="inline-flex rounded-full bg-green-800 px-6 py-3 font-head font-semibold text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                    >
                        Learn More About Us
                    </Link>
                </div>
            </div>
        </section>
    );
}
