import { usePage } from '@inertiajs/react';

interface AppLogoIconProps {
    className?: string;
}

export default function AppLogoIcon({ className = '' }: AppLogoIconProps) {
    const { logoAccepted } = usePage().props;
    return (
        <div className={`mb-12 flex items-center justify-center space-x-4 ${className}`}>
            {/* <img className="w-16" src="/images/logo.jpeg" />
            <h2 className="font-head text-3xl font-bold text-green-800">NAACT</h2> */}

            {logoAccepted ? (
                <img src="/images/naact-logo.png" alt="Logo" className="h-12 w-auto" />
            ) : (
                <span className="flex items-center space-x-2">
                    <img src="/images/logo.jpeg" alt="Logo" className="h-12 w-12" />
                    <span className="font-head text-3xl font-bold text-green-800">NAACT</span>
                </span>
            )}
        </div>
    );
}
