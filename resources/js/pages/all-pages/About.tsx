import PageHeader from '@/components/mycomponents/PageHeader';
import { UsersCard } from '@/components/mycomponents/UsersCard';
import WhatWeDoSection from '@/components/mycomponents/WhatWeDoSection';
import Layout from '@/layouts/page-layout';
import { Head } from '@inertiajs/react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface Official {
    name: string;
    role: string;
    image?: string;
}

const About = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3, // start counting when 30% in view
    });

    const counters = [
        { number: 400, suffix: '+', label: 'Community Members' },
        { number: 40, suffix: '+', label: 'Ongoing Projects' },
        { number: 10, suffix: '+', label: 'Events Per Year' },
        { number: 10000, suffix: '+', label: 'People Supported' },
    ];

    const firstOfficials: Official[] = [
        { name: 'Dr. Joe Ikea', role: 'President' },
        { name: 'Mrs Bola Adeyemi', role: 'Vice President' },
        { name: 'Mr Akin Adisa', role: 'General Secretary' },
        { name: 'Barrister Uche Okorie', role: 'Assistant Secretary' },
        { name: 'Mrs Margaret Ihejie', role: 'Treasurer' },
        { name: 'Ms Funmi Osituyo', role: 'Assistant Treasurer' },
        { name: 'Timi Olusesi', role: 'PRO' },
        { name: 'Joe Akachili', role: 'Social Secretary' },
        { name: 'Ms. Stella Megwa / Adura Abiona', role: 'Ex-officio' },
        { name: 'John Okonkwo', role: 'Provost' },
    ];

    const incumbentOfficials: Official[] = [
        { name: 'Prof Francis Chuks Ogbonnaya', role: 'President', image: '/images/pres.jpeg' },
        { name: 'Mrs Juliana Onunuga', role: 'Vice President' },
        { name: 'Mrs Bola Olatunbosun ', role: 'General Secretary' },
        { name: 'Ms Lilian Amaka Udenta', role: 'Assistant Secretary' },
        { name: 'Mr Kunmi Onisemo', role: 'Public Relations Officer (P.R.O.)', image: '/images/pro.jpeg' },
        { name: 'Mr Stephen Durodola', role: 'Treasurer', image: '/images/tre.jpeg' },
        // { name: 'Ms Funmi Osituyo', role: 'Assistant Treasurer' },
        // { name: 'Joe Akachili', role: 'Social Secretary' },
        // { name: 'Ms. Stella Megwa / Adura Abiona', role: 'Ex-officio' },
        { name: 'Ms Nancy Amarachi Pius', role: 'Provost', image: '/images/prov.jpeg' },
    ];

    return (
        <>
            <Head title="About Us" />
            <PageHeader title={'About us'} />
            <main className="bg-white">
                <section className="overflow-hidden py-16 md:py-20">
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
                            <h2 className="mb-6 font-head text-3xl font-bold text-green-950 md:text-4xl">History</h2>
                            <p className="text-base leading-8 text-gray-700">
                                The Nigerian Association in the Australian Capital Territory (NAACT) was officially registered as an incorporated
                                entity in Australia on 13 October 2019, with the Australian Business Number (ABN) 87 664 230 893. It is classified as
                                an “Other Incorporated Entity”. NAACT is a registered member of the Council of Nigerian Associations Presidents in
                                Australia (CoNAPA), which comprises registered Nigerian national associations across Australia's six states and two
                                territories indicating its formal recognition and active participation within the broader Nigerian Australian
                                community. <br />
                                The association was officially established on 26 July 2014 during a meeting at the Nigeria High Commission, 26
                                Guilfoyle St, Yarralumla – ACT (3:45 – 05:10pm).
                            </p>
                        </div>
                    </div>
                </section>
                <section className="border-y border-gray-100 bg-green-50/50 py-16 md:py-20">
                    <div className="mx-auto max-w-7xl px-4">
                        <h2 className="mb-10 max-w-2xl font-head text-2xl font-bold text-green-950 md:text-3xl">
                            The following individuals were elected as officials:
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {firstOfficials.map((official, index) => (
                                <UsersCard key={index} name={official.name} role={official.role} image={official.image} />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="overflow-hidden py-16 md:py-20">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
                        <div className="overflow-hidden rounded-2xl shadow-lg">
                            <img src="/images/ab1.jpg" alt="About NAACT" className="h-80 w-full object-cover sm:h-[28rem]" />
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6 md:p-10">
                            <p className="text-base leading-8 text-gray-700">
                                Prior to its inaugural meeting, there was no formal organisational structure or official Nigerian Association in
                                place, although the group had existed since 2010. <br /> The individuals involved at the outset are recognised as the
                                founding officials of NAACT, whose leadership was instrumental in establishing the association. According to the
                                minutes of the general meeting held on 19 April 2015 at the Multicultural Centre, ACT (4:00pm – 6:30pm), the
                                registration date for NAACT was recorded as 03 March 2015. Since its formation, the association has been led by
                                several presidents, including Bola Adeyemi and Barrister Uche Okorie. <br />
                                Notable Vice Presidents have included Margaret Ihegie, Kingsley Omosigho, and Solicitor Chika Barry (MLA) while
                                individuals who have served as General Secretary include Pastor Adura Abiona, Dr Akin Adisa, Barrister Uche Okorie,
                                and Bright Dike. Barrister Uche Okorie being the preceding President prior to the incumbent team
                            </p>
                        </div>
                    </div>
                </section>
                <section className="border-y border-gray-100 bg-green-50/50 py-16 md:py-20">
                    <div className="mx-auto max-w-7xl px-4">
                        <h2 className="mb-10 max-w-4xl font-head text-2xl font-bold text-green-950 md:text-3xl">
                            The following are the incumbent team of the Nigeria Association in the Australia Capital Territory (NAACT), 2023 to
                            present
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {incumbentOfficials.map((official, index) => (
                                <UsersCard key={index} name={official.name} role={official.role} image={official.image} />
                            ))}
                        </div>
                    </div>
                </section>
                <section ref={ref} className="px-4 py-16 md:py-20">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-green-900 px-4 py-8 text-white shadow-lg md:px-8 md:py-10">
                        <div className="grid grid-cols-2 text-center md:grid-cols-4">
                            {counters.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center px-4 py-6 ${index === 0 ? 'border-r border-b border-white/50 md:border-r md:border-b-0' : ''} ${index === 1 ? 'border-b border-white/50 md:border-r md:border-b-0' : ''} ${index === 2 ? 'border-r border-white/50 md:border-r md:border-b-0' : ''} ${index === 3 ? 'md:border-b-0' : ''} `}
                                >
                                    <h2 className="font-head text-2xl font-bold sm:text-3xl">
                                        {inView ? <CountUp end={item.number} duration={2.5} suffix={item.suffix} /> : `0${item.suffix}`}
                                    </h2>
                                    <p className="mt-2 text-sm text-white/90 md:text-base">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="border-y border-gray-100 bg-white py-16 md:py-20">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
                            <div className="md:col-span-1">
                                <div className="mb-4 h-1 w-14 rounded-full bg-green-700" />
                                <h2 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Our Mission & Vision</h2>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <img src="/images/mission.webp" alt="Our Mission" className="h-48 w-full object-cover" />
                                <div className="p-6">
                                    <h3 className="mb-3 font-head text-xl font-bold text-green-950">Our Mission</h3>
                                    <p className="text-sm leading-6 text-gray-600">
                                        To promote the welfare and interests of Nigerians in the ACT, foster a strong and supportive community, and
                                        celebrate our rich cultural heritage through collaboration, education, and engagement.
                                    </p>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <img src="/images/vision.webp" alt="Our Vision" className="h-48 w-full object-cover" />
                                <div className="p-6">
                                    <h3 className="mb-3 font-head text-xl font-bold text-green-950">Our Vision</h3>
                                    <p className="text-sm leading-6 text-gray-600">
                                        To be a united and thriving Nigerian community that positively contributes to the multicultural fabric of
                                        Australia, while empowering every member to succeed and feel at home.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <WhatWeDoSection />
            </main>
        </>
    );
};

About.layout = (page: React.ReactNode) => <Layout children={page} />;
export default About;
