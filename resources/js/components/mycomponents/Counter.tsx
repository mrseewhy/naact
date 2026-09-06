import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function CounterSection() {
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

    return (
        <section ref={ref} className="relative px-4 md:-mt-24">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-green-900 px-4 py-8 text-white shadow-lg md:px-8 md:py-10">
                <div className="grid grid-cols-2 text-center md:grid-cols-4">
                    {counters.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center px-4 py-6 ${index === 0 ? 'border-r border-b border-white/50 md:border-r md:border-b-0' : ''} ${index === 1 ? 'border-b border-white/50 md:border-r md:border-b-0' : ''} ${index === 2 ? 'border-r border-white/50 md:border-r md:border-b-0' : ''} ${index === 3 ? 'md:border-b-0' : ''} `}
                        >
                            <p className="font-head text-2xl font-bold sm:text-3xl">
                                {inView ? <CountUp end={item.number} duration={2.5} suffix={item.suffix} /> : `0${item.suffix}`}
                            </p>
                            <p className="mt-2 text-sm text-white/90 md:text-base">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
