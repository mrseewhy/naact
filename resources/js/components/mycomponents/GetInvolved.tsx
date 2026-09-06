import { Link } from '@inertiajs/react';

export default function GetInvolvedSection() {
    return (
        <section
            className="relative py-16 text-white md:py-20"
            style={{
                backgroundImage: "url('/images/bg2.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 z-0 bg-green-900/95" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                <h2 className="mb-4 font-head text-3xl font-bold md:text-4xl">Get Involved With Our Projects</h2>
                <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
                    Whether you’re donating, volunteering, or spreading awareness — your involvement helps us support and empower the Nigerian
                    community across the Australian Capital Territory.
                </p>
                <div className="flex flex-row justify-center gap-4">
                    <Link
                        href="/get-involved"
                        className="rounded-full bg-white px-6 py-3 font-head font-semibold text-green-800 transition hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Get Involved
                    </Link>
                    <Link
                        href="/donate"
                        className="rounded-full border border-white/60 bg-transparent px-6 py-3 font-head font-semibold text-white transition hover:bg-white hover:text-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Donate
                    </Link>
                </div>
            </div>
        </section>
    );
}
