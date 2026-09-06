import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Calendar,
    Church,
    DollarSign,
    ExternalLink,
    Heart,
    MapPin,
    Phone,
    Plane,
    Scissors,
    Shirt,
    ShoppingBag,
    Stethoscope,
    UserRound,
    UtensilsCrossed,
    type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface Business {
    name: string;
    url?: string;
    address?: string;
    phone?: string;
    contact?: string;
}

interface BusinessCategory {
    title: string;
    slug: string;
    icon: LucideIcon;
    businesses: Business[];
}

const categories: BusinessCategory[] = [
    {
        title: 'Medical Centres',
        slug: 'medical-centres',
        icon: Stethoscope,
        businesses: [
            { name: 'Evatt Medical Centre', url: 'https://www.evattmedicalcentre.com.au' },
            { name: 'Kenolta Medical Centre', url: 'www.kenolta.com.au' },
            { name: "Junic Medical Imaging and Women's Centre", url: 'www.junicimaging.com.au' },
            { name: 'Junic Eyecare Centre', url: 'https://juniceyecare.com.au' },
            { name: 'Belconnen Medical and Skin Clinic', url: 'belconnenclinic.com.au' },
            { name: 'Molonglo Valley Medical Centre', url: 'Molonglovalleymedicalcentre.com.au' },
            { name: 'Kippax Medical Centre', url: 'kippaxmedicalcentre.com.au' },
            { name: 'Greenways Medical Centre', url: 'greenwaymrdicalcentre.com.au' },
            { name: 'Health Fount Medicals: Macquarie General Practice', url: 'healthfountmedical.com.au' },
            { name: 'Wallace Street Medical Centre', url: 'wallacesmc.com.au' },
        ],
    },
    { title: 'Allied Health', slug: 'allied-health', icon: Heart, businesses: [{ name: 'Functional Ways', url: 'www.functionalways.com.au' }] },
    {
        title: 'Supermarkets',
        slug: 'supermarkets',
        icon: ShoppingBag,
        businesses: [{ name: 'Uniq African Stores', url: 'https://uniqafricanstores.com.au' }],
    },
    {
        title: 'Churches',
        slug: 'churches',
        icon: Church,
        businesses: [
            { name: 'Agape Pentecostal Fellowship', contact: 'Pastor Dr Joseph Ikea' },
            { name: 'The Gospel Faith Mission International (GOFAMINT)', contact: 'Pastor Mike Oniyelu', address: '20 Wimmera Street, Harrison' },
            { name: 'Winners Chapel Canberra', address: '4/52 Hoskins Street, Mitchell' },
            { name: 'Redeemed Christian Church' },
        ],
    },
    { title: 'Events Management', slug: 'events-management', icon: Calendar, businesses: [{ name: 'White Angels Classic Event' }] },
    {
        title: 'Hair Salons, Makeup Artists & Stylists',
        slug: 'hair-and-beauty',
        icon: Scissors,
        businesses: [{ name: 'Gbay Hair and Makeover', address: '67 Lionel Rose Street, Holt' }],
    },
    { title: 'Catering & Hospitality', slug: 'catering', icon: UtensilsCrossed, businesses: [{ name: 'OCIFOODS a.k.a Amala Hangout' }] },
    {
        title: 'Migration Agents & Advisers',
        slug: 'migration',
        icon: Plane,
        businesses: [{ name: 'SWIVIVA', url: 'https://www.swiviva.com' }, { name: 'Visaairways and Migration Advisers' }],
    },
    {
        title: 'Financial Services',
        slug: 'financial-services',
        icon: DollarSign,
        businesses: [
            { name: 'OAUM Securities', url: 'www.oaum.com.au', address: 'C05/25 Challis Street, Dickson, ACT' },
            { name: 'Tayrex Exchange', address: '31/363 Mirrabei Drive, Moncrieff ACT 2913' },
        ],
    },
    { title: 'Fashion Design & Clothing', slug: 'fashion', icon: Shirt, businesses: [{ name: 'Mickscollections', phone: '+61 433 374 810' }] },
];

const BusinessCard = ({ name, url, address, phone, contact }: Business) => (
    <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-100 hover:shadow-lg">
        <h3 className="font-head text-xl font-bold text-green-950">{name}</h3>
        <div className="mt-4 flex-1 space-y-3">
            {address && (
                <p className="flex items-start gap-2 text-sm leading-6 text-gray-600">
                    <MapPin className="mt-1 size-4 shrink-0 text-green-700" />
                    <span>{address}</span>
                </p>
            )}
            {phone && (
                <p className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="size-4 shrink-0 text-green-700" />
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-green-700">
                        {phone}
                    </a>
                </p>
            )}
            {contact && (
                <p className="flex items-center gap-2 text-sm text-gray-600">
                    <UserRound className="size-4 shrink-0 text-green-700" />
                    <span>{contact}</span>
                </p>
            )}
        </div>
        {url && (
            <a
                href={url.startsWith('http') ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-head text-sm font-semibold text-green-800 hover:text-green-600"
            >
                Visit website <ExternalLink className="size-4" />
            </a>
        )}
    </article>
);

const CategorySection = ({ category }: { category: BusinessCategory }) => {
    const Icon = category.icon;

    return (
        <section id={category.slug} className="scroll-mt-24 border-t border-gray-100 pt-12">
            <div className="mb-7 flex items-center gap-4">
                <div className="rounded-xl bg-green-50 p-3">
                    <Icon className="size-6 text-green-700" />
                </div>
                <div>
                    <h2 className="font-head text-2xl font-bold text-green-950 md:text-3xl">{category.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {category.businesses.length} {category.businesses.length === 1 ? 'listing' : 'listings'}
                    </p>
                </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {category.businesses.map((business) => (
                    <BusinessCard key={business.name} {...business} />
                ))}
            </div>
        </section>
    );
};

const Businesses = () => (
    <>
        <Head title="Businesses" />
        <PageHeader title="Businesses" />

        <section className="bg-white py-16">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-10 overflow-hidden rounded-2xl bg-green-50 lg:grid-cols-2">
                    <img src="/images/nigerian-business.jpeg" alt="Nigerian business owners" className="h-full min-h-80 w-full object-cover" />
                    <div className="p-8 lg:p-12">
                        <p className="mb-2 font-head text-sm font-bold tracking-widest text-green-700 uppercase">Support local enterprise</p>
                        <h1 className="font-head text-3xl font-bold text-green-950 md:text-4xl">Nigerian Businesses in Canberra</h1>
                        <p className="mt-5 leading-7 text-gray-600">
                            Discover businesses, professionals, services, and community organisations connected to the Nigerian community across the
                            ACT.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 font-head font-semibold text-white hover:bg-green-700"
                        >
                            Add or update a listing <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>

                <nav aria-label="Business categories" className="mt-12">
                    <p className="mb-4 font-head text-sm font-bold tracking-wider text-green-950 uppercase">Browse by category</p>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <a
                                key={category.slug}
                                href={`#${category.slug}`}
                                className="rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-800 transition hover:border-green-700 hover:bg-green-50"
                            >
                                {category.title}
                            </a>
                        ))}
                    </div>
                </nav>

                <div className="mt-14 space-y-14">
                    {categories.map((category) => (
                        <CategorySection key={category.slug} category={category} />
                    ))}
                </div>

                <div className="mt-16 rounded-2xl bg-green-900 px-6 py-10 text-center text-white md:px-12">
                    <h2 className="font-head text-3xl font-bold">Is your business missing?</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-green-50">
                        Contact NAACT to request a new listing or update existing business information.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-head font-semibold text-green-900 hover:bg-green-50"
                    >
                        Contact us <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    </>
);

Businesses.layout = (page: ReactNode) => <Layout children={page} />;
export default Businesses;
