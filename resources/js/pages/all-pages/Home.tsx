import AboutSection from '@/components/mycomponents/About';
import BlogSection from '@/components/mycomponents/BlogSection';
import BusinessCTA from '@/components/mycomponents/BusinessCTA';
import ContactSection from '@/components/mycomponents/ContactSection';
import CounterSection from '@/components/mycomponents/Counter';
import EventsSection from '@/components/mycomponents/EventsSection';
import GetInvolvedSection from '@/components/mycomponents/GetInvolved';
import Hero from '@/components/mycomponents/Hero';
import ProgrammesSection from '@/components/mycomponents/Programme';
import Layout from '@/layouts/page-layout';
import type { Event, Post, Programme } from '@/types';
import { Head } from '@inertiajs/react';

interface HomeProps {
    programmes: Programme[];
    events: Event[];
    posts: Post[];
}

const Home = ({ programmes, events, posts }: HomeProps) => {
    return (
        <>
            <Head title="Home" />
            <Hero />
            <CounterSection />
            <AboutSection />
            <ProgrammesSection programmes={programmes} />
            <GetInvolvedSection />
            <BusinessCTA />
            <EventsSection events={events} />
            <BlogSection posts={posts} />
            <ContactSection />
        </>
    );
};

Home.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Home;
