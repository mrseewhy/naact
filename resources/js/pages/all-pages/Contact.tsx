import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { Head, useForm } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, Phone, Smartphone, Youtube } from 'lucide-react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';

// TikTok placeholder (lucide doesn't include it natively)
const TikTok = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.7 6.3c-1-.4-1.7-1.1-2.1-2-.2-.6-.4-1.3-.4-2h-3v14c0 .6-.4 1-1 1s-1-.4-1-1c0-.6.4-1 1-1 .3 0 .7.1.9.3v-3c-.3 0-.6-.1-.9-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-6.6c1 .6 2.1.9 3.1.9V6.3h-.6z" />
    </svg>
);

const Contact = () => {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                // Show validation errors or generic error
                if (Object.keys(errors).length > 0) {
                    toast.error('Please check the form for errors');
                } else {
                    toast.error('An error has occurred');
                }
            },
        });
    };
    return (
        <>
            <Head title="Contact Us" />
            <PageHeader title={'Contact us'} />
            <section className="bg-white px-4 py-16">
                <div className="container mx-auto max-w-7xl space-y-12">
                    <div className="grid grid-cols-1 items-stretch gap-10 overflow-hidden rounded-2xl bg-green-50 lg:grid-cols-2">
                        <div className="min-h-80 lg:min-h-[34rem]">
                            <img src="/images/contact-us-woman.png" alt="A woman speaking on the phone" className="h-full w-full object-cover" />
                        </div>

                        <div className="space-y-6 p-8 lg:flex lg:flex-col lg:justify-center lg:p-12">
                            <div>
                                <h2 className="mb-6 font-head text-3xl font-bold text-green-800 md:text-4xl">Follow Us on Socials</h2>

                                {/* Social Icons */}
                                <div className="mb-6 flex flex-wrap gap-4">
                                    <a
                                        href="https://www.linkedin.com/company/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-green-800 p-3 text-white transition hover:bg-green-700"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-green-800 p-3 text-white transition hover:bg-green-700"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-green-800 p-3 text-white transition hover:bg-green-700"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                    <a
                                        href="https://www.tiktok.com/@#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-green-800 p-3 text-white transition hover:bg-green-700"
                                    >
                                        <TikTok />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-green-800 p-3 text-white transition hover:bg-green-700"
                                    >
                                        <Youtube size={20} />
                                    </a>
                                </div>
                            </div>
                            {/* Item */}
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-green-800 p-3 text-white">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="font-head text-base font-semibold text-green-900">Email Us</p>
                                    <p className="text-sm text-gray-600">info@naact.org.au</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-green-800 p-3 text-white">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="font-head text-base font-semibold text-green-900">Call Us</p>
                                    <p className="text-sm text-gray-600">+16 000000 00000 </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-green-800 p-3 text-white">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <p className="font-head text-base font-semibold text-green-900">WhatsApp</p>
                                    <p className="text-sm text-gray-600">+16 000000 00000</p>
                                </div>
                            </div>

                            {/* <div className="flex items-start gap-4">
                                <div className="rounded-full bg-green-800 p-3 text-white">
                                    <Send size={20} />
                                </div>
                                <div>
                                    <p className="font-head text-base font-semibold text-green-900">Send Us a Message</p>
                                    <p className="text-sm text-gray-600">
                                        <Link href="/contact" className="text-green-700 underline hover:text-green-600">
                                            Visit our contact page
                                        </Link>
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="mb-8 max-w-3xl">
                            <h2 className="mb-3 font-head text-3xl font-bold text-green-800 md:text-4xl">Send Us a Message</h2>
                            <p className="leading-relaxed text-gray-700">
                                Before filling out the contact form, we encourage you to reach out via phone, WhatsApp, or email for faster response.
                                We’re always happy to hear from you.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full space-y-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-10">
                            <div className="absolute -left-[10000px]" aria-hidden="true">
                                <label htmlFor="website">Leave this field empty</label>
                                <input
                                    id="website"
                                    type="text"
                                    name="website"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                        value={data.name}
                                        onChange={(e) => {
                                            setData('name', e.target.value);
                                            if (errors.name) {
                                                clearErrors('name');
                                            }
                                        }}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                                    />
                                    {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        required
                                        value={data.email}
                                        onChange={(e) => {
                                            setData('email', e.target.value);
                                            if (errors.email) {
                                                clearErrors('email');
                                            }
                                        }}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                                    />
                                    {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    required
                                    value={data.subject}
                                    onChange={(e) => {
                                        setData('subject', e.target.value);
                                        if (errors.subject) {
                                            clearErrors('subject');
                                        }
                                    }}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                                />
                                {errors.subject && <span className="text-sm text-red-600">{errors.subject}</span>}
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows={5}
                                    required
                                    value={data.message}
                                    onChange={(e) => {
                                        setData('message', e.target.value);
                                        if (errors.message) {
                                            clearErrors('message');
                                        }
                                    }}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                                ></textarea>
                                {errors.message && <span className="text-sm text-red-600">{errors.message}</span>}
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-green-800 py-3 font-head font-medium text-white transition hover:bg-green-700"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

Contact.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Contact;
