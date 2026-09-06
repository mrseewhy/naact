import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programmes', href: '/programmes' },
    { name: 'Businesses', href: '/businesses' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const { logoAccepted } = usePage().props;

    return (
        <header className="sticky top-0 z-50 bg-white font-head shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                {logoAccepted ? (
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="/images/naact-logo.png" alt="Logo" className="h-12 w-auto" />
                    </Link>
                ) : (
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="/images/logo.jpeg" alt="Logo" className="h-12 w-12" />
                        <span className="text-2xl font-bold text-green-800">NAACT</span>
                    </Link>
                )}
                {/* Desktop Menu */}
                <nav className="hidden items-center space-x-6 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={` ${url === link.href ? 'font-body font-bold text-green-600' : 'font-body font-bold text-green-800 hover:text-green-600'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA Buttons (Desktop) */}
                <div className="hidden space-x-2 lg:flex">
                    <Link href="/donate" className="w-32 rounded-full bg-green-800 px-4 py-2 text-center text-white hover:bg-green-600">
                        Donate
                    </Link>
                    <Link
                        href="/get-involved"
                        className="w-32 rounded-full border border-green-800 px-4 py-2 text-center text-green-800 hover:bg-green-50"
                    >
                        Get Involved
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-green-800 p-2 text-white lg:hidden">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            {isOpen && (
                <div className="absolute top-[72px] right-0 left-0 z-50 border-t border-gray-200 bg-white shadow-md lg:hidden">
                    <nav className="flex flex-col space-y-4 px-4 py-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-medium ${url === link.href ? 'text-green-600' : 'text-green-800 hover:text-green-600'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            href="/donate"
                            className="mt-4 rounded-full bg-green-800 px-4 py-2 text-center text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Donate
                        </Link>
                        <Link
                            href="/get-involved"
                            className="rounded-full border border-green-800 px-4 py-2 text-center text-green-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Involved
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
