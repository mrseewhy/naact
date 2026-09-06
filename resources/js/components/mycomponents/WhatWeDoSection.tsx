import { Landmark, Megaphone, Smile, Users } from 'lucide-react';

export default function WhatWeDoSection() {
    const items = [
        {
            title: 'Cultural Celebration',
            description:
                'We organise events that showcase Nigerian traditions—such as Independence Day, food festivals, and cultural showcases—to keep our heritage alive and share it with the wider community.',
            icon: <Landmark className="h-8 w-8 text-green-800" />,
        },
        {
            title: 'Community Support',
            description:
                'From helping new arrivals settle in to offering guidance and emotional support, we provide a strong network of care for Nigerians in the ACT.',
            icon: <Users className="h-8 w-8 text-green-800" />,
        },
        {
            title: 'Youth & Family Engagement',
            description:
                'We empower the next generation through mentorship, educational initiatives, and fun family-friendly activities that build confidence and connection.',
            icon: <Smile className="h-8 w-8 text-green-800" />,
        },
        {
            title: 'Advocacy & Representation',
            description:
                'We give voice to Nigerian interests in the ACT, engaging with government and multicultural bodies to promote inclusion and equity.',
            icon: <Megaphone className="h-8 w-8 text-green-800" />,
        },
    ];

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 max-w-2xl">
                    <div className="mb-4 h-1 w-14 rounded-full bg-green-700" />
                    <h2 className="font-head text-3xl font-bold text-green-950 md:text-4xl">What We Do</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">{item.icon}</div>
                            <h3 className="mb-3 font-head text-lg font-bold text-green-950">{item.title}</h3>
                            <p className="text-sm leading-6 text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
