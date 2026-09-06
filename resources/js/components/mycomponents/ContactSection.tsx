import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, Phone, Send, Smartphone, Youtube } from 'lucide-react';

// TikTok doesn't exist in lucide-react, using a placeholder icon or you can import a custom SVG
const TikTok = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.7 6.3c-1-.4-1.7-1.1-2.1-2-.2-.6-.4-1.3-.4-2h-3v14c0 .6-.4 1-1 1s-1-.4-1-1c0-.6.4-1 1-1 .3 0 .7.1.9.3v-3c-.3 0-.6-.1-.9-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-6.6c1 .6 2.1.9 3.1.9V6.3h-.6z" />
    </svg>
);

export default function ContactSection() {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-4 h-1 w-14 rounded-full bg-green-700" />
                <h2 className="mb-8 font-head text-3xl font-bold text-green-950 md:text-4xl">Contact Us</h2>

                {/* Social Media Icons */}
                <div className="mb-12 flex flex-wrap gap-4">
                    <a
                        href="https://www.linkedin.com/company/#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-800 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="https://www.facebook.com/#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-800 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        aria-label="Facebook"
                    >
                        <Facebook size={20} />
                    </a>
                    <a
                        href="https://www.instagram.com/#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-800 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        aria-label="Instagram"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href="https://www.tiktok.com/@#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-800 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        aria-label="TikTok"
                    >
                        <TikTok />
                    </a>
                    <a
                        href="https://www.youtube.com/#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-800 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        aria-label="YouTube"
                    >
                        <Youtube size={20} />
                    </a>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Email */}
                    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="rounded-xl bg-green-50 p-3 text-green-800">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-green-900">Email Us</p>
                            <p className="text-sm text-gray-600">info@naact.org.au</p>
                        </div>
                    </div>

                    {/* Call */}
                    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="rounded-xl bg-green-50 p-3 text-green-800">
                            <Phone size={20} />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-green-900">Call Us</p>
                            <p className="text-sm text-gray-600">+16 000000 00000</p>
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="rounded-xl bg-green-50 p-3 text-green-800">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-green-900">WhatsApp</p>
                            <p className="text-sm text-gray-600">+16 000000 00000</p>
                        </div>
                    </div>

                    {/* Send Message */}
                    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <div className="rounded-xl bg-green-50 p-3 text-green-800">
                            <Send size={20} />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-green-900">Send Us a Message</p>
                            <p className="text-sm text-gray-600">
                                <Link href="/contact" className="text-green-800 underline hover:text-green-600">
                                    Visit our contact page
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
