interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({ title, subtitle = '' }: PageHeaderProps) {
    return (
        <div className="bg-green-800 py-8 font-head text-white md:py-12">
            <div className="container mx-auto max-w-7xl px-4">
                <h1 className="border-l-4 border-white/40 py-2 pl-6 text-3xl font-semibold md:text-4xl">{title}</h1>
                {subtitle && <p className="mx-auto mt-2 max-w-2xl text-sm text-white/80 md:text-base">{subtitle}</p>}
            </div>
        </div>
    );
}
