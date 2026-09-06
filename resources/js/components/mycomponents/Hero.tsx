import { Link } from '@inertiajs/react';

export default function Hero({
    title = 'Connecting Nigerians, Celebrating Culture, Building Community',
    description = 'The Nigerian Association in the Australian Capital Territory is a vibrant hub for unity, cultural pride, and mutual support—bringing together Nigerians in Canberra and surrounding regions to thrive together.',
    backgroundImage = '/images/bg1.jpg', // Replace with your image path
    primaryButton = { label: 'Get Involved', href: '/get-involved' },
    secondaryButton = { label: 'Donate', href: '/donate' },
}) {
    return (
        <section
            className="relative flex h-[75vh] w-full items-center justify-center text-white md:h-[85vh]"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Green overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                <h1 className="font-head text-3xl leading-tight font-bold md:text-5xl">{title}</h1>
                <p className="mt-4 font-sans text-base text-white/90 md:text-lg">{description}</p>

                {/* Buttons */}
                <div className="mt-6 flex flex-row items-center justify-center gap-4">
                    <Link
                        href={primaryButton.href}
                        className="w-36 rounded-full border border-white bg-white px-4 py-3 font-head font-semibold text-green-800 transition hover:bg-green-50"
                    >
                        {primaryButton.label}
                    </Link>
                    <Link
                        href={secondaryButton.href}
                        className="w-36 rounded-full border border-white px-4 py-3 font-head font-semibold text-white transition hover:bg-white hover:text-green-800"
                    >
                        {secondaryButton.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}
