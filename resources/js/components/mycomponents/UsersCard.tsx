import { User } from 'lucide-react';

interface UsersCardProps {
    name: string;
    role: string;
    image?: string;
}

export const UsersCard = ({ name, role, image }: UsersCardProps) => (
    <div className="group flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
        <div className="mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-green-50 bg-green-50 ring-1 ring-green-100">
            {image ? <img src={image} alt={name} className="h-full w-full object-cover" /> : <User className="h-12 w-12 text-green-700" />}
        </div>
        <h3 className="font-head text-lg leading-snug font-bold text-green-950">{name}</h3>
        <p className="font-body mt-2 text-sm font-medium text-green-700">{role}</p>
    </div>
);
