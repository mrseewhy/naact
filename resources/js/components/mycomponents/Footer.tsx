import { Link } from '@inertiajs/react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-green-800 font-head text-white">
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
                {/* Upper Section */}
                <div className="flex flex-col items-start justify-between gap-6 pt-10 md:flex-row md:items-center">
                    {/* Left - Logo and Text */}
                    <Link href={'/'}>
                        <div className="flex items-center space-x-3">
                            <img src="/images/logo.jpeg" alt="NAACT Logo" className="h-10 w-10" />
                            <span className="text-lg font-semibold">NAACT</span>
                        </div>
                    </Link>

                    {/* Right - Navigation Links */}
                    <div className="flex flex-col space-y-2 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
                        <Link href="/about" className="hover:underline">
                            About Us
                        </Link>
                        <Link href="/privacy-policy" className="hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:underline">
                            Terms
                        </Link>
                        <Link href="/get-involved" className="hover:underline">
                            Get Involved
                        </Link>
                        <Link href="/donate" className="hover:underline">
                            Donate
                        </Link>
                    </div>
                </div>

                {/* Lower Section */}
                <div className="border-t border-white/20 pt-6 text-center text-sm text-white/80">© {year} NAACT. All rights reserved.</div>
            </div>
        </footer>
    );
}
